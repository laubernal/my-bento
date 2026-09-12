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
    Box,
    Select,
    TextInput
} from '@mantine/core';
import {useApi} from '../../hooks/useApi.ts';
import {getFoods} from '../../api/foods.ts';
import type {Food} from '../../api/types.ts';
import {useState} from 'react';
import * as React from 'react';

function groupFoodsByCategory(foods: Food[]): Record<string, Food[]> {
    return foods.reduce<Record<string, Food[]>>((groups, food) => {
        (groups[food.category] ??= []).push(food);
        return groups;
    }, {});
}

type FoodCategory = "protein" | "grain" | "vegetable" | "fruit" | "dairy" | "other";
interface FoodToAdd {
    name: string,
    category: string
}

export function FoodList() {
    const theme = useMantineTheme();
    const {data, loading, error} = useApi(getFoods);
    const [name, setName] = useState("")
    const [category, setCategory] = useState<FoodCategory>("protein")
    
    const categories = [
        "protein",
        "grain",
        "vegetable",
        "fruit",
        "dairy",
        "other",
    ] as FoodCategory[]
    const foods = data ? data : [];
    const foodsGroupedByCategory = Object.entries(groupFoodsByCategory(foods));
    
    const onAdd = (food: FoodToAdd): void => {
        console.log(food);
        throw new Error('Method not implemented.');
    }
    
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
                
                {/*<Grid.Col span={0}>*/}
                {/*    <Button bg={theme.colors.brand[3]} variant="filled">Add food</Button>*/}
                {/*</Grid.Col>*/}
            </Grid>
            
            <Paper
                p="md"
                radius={12}
                bg={theme.colors.accent[0]}
                withBorder
                styles={{
                    root: {
                        borderColor: theme.colors.warm[4],
                    },
                }}
            >
                <Title
                    order={3}
                    fz="md"
                    fw={600}
                    ff="Fraunces"
                    c={theme.colors.warm[9]}
                    mb="md"
                >
                    Add a food
                </Title>
                
                <Box
                    component="form"
                    onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        
                        if (name.trim()) {
                            onAdd({ name: name.trim(), category});
                            setName('');
                        }
                    }}
                >
                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        gap="sm"
                        align={{ base: "stretch", sm: "flex-end" }}
                        wrap="wrap"
                    >
                        <TextInput
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            placeholder="e.g. Quinoa"
                            size="md"
                            style={{ flex: 1, minWidth: 180 }}
                            styles={{
                                label: {
                                    color: theme.colors.warm[5],
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                },
                                input: {
                                    borderColor: theme.colors.warm[4],
                                    backgroundColor: theme.colors.warm[0],
                                    borderRadius: "12px",
                                    fontSize: "0.875rem",
                                },
                            }}
                        />
                        
                        <Select
                            label="Category"
                            value={category}
                            onChange={(value) => {
                                if (value) {
                                    setCategory(value as FoodCategory)
                                }
                            }}
                            data={categories.map((c) => ({
                                value: c,
                                label: c.charAt(0).toUpperCase() + c.slice(1),
                            }))}
                            size="md"
                            styles={{
                                label: {
                                    color: theme.colors.warm[5],
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                },
                                input: {
                                    borderColor: theme.colors.warm[4],
                                    backgroundColor: theme.colors.warm[0],
                                    borderRadius: "12px",
                                    fontSize: "0.875rem",
                                },
                            }}
                        />
                        
                        <Button
                            type="submit"
                            size="md"
                            radius={12}
                            w={{ base: "100%", sm: "auto" }}
                            bg={theme.colors.brand[3]}
                            color={theme.colors.accent[0]}
                            fw={600}
                            fz="sm"
                        >
                            Add food
                        </Button>
                    </Flex>
                </Box>
            </Paper>
            
            
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