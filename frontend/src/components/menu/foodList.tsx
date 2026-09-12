import {Loading} from '../shared/loading.tsx';
import {
    Button,
    Flex,
    Grid,
    Group,
    Paper,
    Space,
    Title,
    Text,
    useMantineTheme, ActionIcon,
    SimpleGrid,
    Box
} from '@mantine/core';
import {useApi} from '../../hooks/useApi.ts';
import {getFoods} from '../../api/foods.ts';
import type {Food} from '../../api/types.ts';

function groupFoodsByCategory(foods: Food[]): Record<string, Food[]> {
    return foods.reduce<Record<string, Food[]>>((groups, food) => {
        (groups[food.category] ??= []).push(food);
        return groups;
    }, {});
}

export function FoodList() {
    const theme = useMantineTheme();
    const {data, loading, error} = useApi(getFoods);
    
    const foods = data ? data : [];
    const foodsGroupedByCategory = Object.entries(groupFoodsByCategory(foods));
    
    const onDelete = (id: string): void => {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    
    return (
        <>
            <Space h="sm"></Space>
            
            <Grid grow>
                <Grid.Col span={10}>
                    <Title>Foods</Title>
                </Grid.Col>
                
                <Grid.Col span={0}>
                    <Button bg={theme.colors.brand[3]} variant="filled">Add food</Button>
                </Grid.Col>
            </Grid>
            
            <Space h="lg"></Space>
            
            <Loading loading={loading}/>
            
            {
                error && <p>{error}</p>
            }
            
            <Flex
                direction="column"
                gap="xl"
            >
                {foodsGroupedByCategory.map(([category, categoryFoods]) => (
                    <Box key={category}>
                        <Title
                            order={3}
                            fz="md"
                            fw={600}
                            ff="Fraunces"
                            tt="capitalize"
                            mb="md"
                            pb="xs"
                            c={theme.colors.warm[9]}
                            style={{
                                borderBottom: `1px solid ${theme.colors.warm[4]}`,
                            }}
                        >
                            {category}
                            
                            <Text
                                component="span"
                                ml="xs"
                                size="sm"
                                fw={400}
                                c={theme.colors.warm[5]}
                            >
                                ({categoryFoods.length})
                            </Text>
                        </Title>
                        
                        <SimpleGrid
                            cols={{ base: 1, sm: 3, lg: 4 }}
                            spacing="xs"
                        >
                            {categoryFoods.map((food) => (
                                <Paper
                                    key={food.id}
                                    px="md"
                                    py="sm"
                                    radius={12}
                                    bg={theme.colors.accent[0]}
                                    withBorder
                                    styles={{
                                        root: {
                                            borderColor: theme.colors.warm[4],
                                        },
                                    }}
                                >
                                    <Group justify="space-between" align="center">
                                        <Text
                                            size="sm"
                                            c={theme.colors.warm[9]}
                                        >
                                            {food.name}
                                        </Text>
                                        
                                        <ActionIcon
                                            data-delete-button
                                            onClick={() => onDelete(food.id)}
                                            variant="transparent"
                                            size="sm"
                                            ml="xs"
                                            c={theme.colors.warm[5]}
                                            styles={{
                                                root: {
                                                    fontSize: '1rem',
                                                    lineHeight: 1,
                                                },
                                            }}
                                        >
                                            ×
                                        </ActionIcon>
                                    </Group>
                                </Paper>
                            ))}
                        </SimpleGrid>
                    </Box>
                ))}
            </Flex>
        </>
    );
}