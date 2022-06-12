import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => ({
        todoList: [
            {
                title: 'todo 1',
                todos: [
                    {
                        content: 'checkbox one todo',
                        checked: true,
                    },
                    {
                        content: 'checkbox two todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox three todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox four todo',
                        checked: false,
                    }
                ],
            },
            {
                title: 'todo 2',
                todos: [
                    {
                        content: 'checkbox one todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox two todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox three todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox four todo',
                        checked: false,
                    }
                ],
            },
            {
                title: 'todo 3',
                todos: [
                    {
                        content: 'checkbox one todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox two todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox three todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox four todo',
                        checked: false,
                    }
                ],
            },
            {
                title: 'todo 4',
                todos: [
                    {
                        content: 'checkbox one todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox two todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox three todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox four todo',
                        checked: false,
                    }
                ],
            },
            {
                title: 'todo 5',
                todos: [
                    {
                        content: 'checkbox one todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox two todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox three todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox four todo',
                        checked: false,
                    }
                ],
            },
            {
                title: 'todo 6',
                todos: [
                    {
                        content: 'checkbox one todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox two todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox three todo',
                        checked: false,
                    },
                    {
                        content: 'checkbox four todo',
                        checked: false,
                    }
                ],
            },
        ]
    }),
    getters: {
        getTodoList: (state) => state.todoList
    },
    actions: {
        setTodoList(todoList) {
            this.todoList = todoList.map((todo) => {
                const item = {
                    todoId: todo.id,
                    title: todo.title,
                    todos: []
                }
                return item;
            })
        }
    }
})