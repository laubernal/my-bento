import {useCallback, useEffect, useRef, useState} from 'react';

export function useApi<T>(fetcher: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetcherRef = useRef(fetcher);
    
    useEffect(() => {
        fetcherRef.current = fetcher;
    });
    
    useEffect(() => {
        let cancelled = false;
        
        fetcherRef.current()
            .then((result: T) => {
                if (!cancelled) {
                    setData(result);
                    setError(null);
                }
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Something went wrong');
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });
        
        return () => {
            cancelled = true;
        };
    }, []);
    
    const refetch = useCallback(() => {
        setLoading(true);
        setError(null);
        
        fetcherRef.current()
            .then((result: T) => {
                setData(result);
                setError(null);
            })
            .catch((err: unknown) => {
                setError(err instanceof Error ? err.message : 'Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    return {data, loading, error, refetch};
}

export function useMutation<TInput, TResult>(fn: (input: TInput) => Promise<TResult>) {
    const [data, setData] = useState<TResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const execute = useCallback(
        async (input: TInput) => {
            setLoading(true);
            setError(null);
            
            try {
                const result = await fn(input);
                setData(result);
                return result;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Something went wrong';
                setError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );
    
    return {data, loading, error, execute};
}
