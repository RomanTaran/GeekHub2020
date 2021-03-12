export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type Todos = Todo[];

export type FooterProps = {
  visibilityFilter: any;
  activeCount: number;
  setFilter: (filter: string) => void;
};

export type HeaderProps = {
  addTodo: (text: string) => any;
};

export type MainSectionProps = {
  todos: Todos;
};

export type TodoItemProps = {
  todo: Todo;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (p: { text: string; id: number }) => void;
};

export type TodoItemState = {
  editing: boolean;
};

export type TodoListProps = {
  todos: Todo[];
};

export type  TodoTextInputProps = {
  text?: string;
  editing?: boolean;
  onSave: (text: string) => void;
  newTodo?: boolean;
  placeholder?: string;
}

export type  TodoTextInputState = {
  text: string;
}


