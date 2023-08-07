export type Note = {
	id: number;
	name: string;
	created: string;
	content: string;
	category: number;
	active: boolean;
};

export type Category = {
	id: number;
	name: string;
	iconPath: string;
};

export type NotesState = {
	notes: Note[];
	categories: Category[]
};

export type FormData = {
	name: string;
	category: string;
	content: string;
	active: boolean;
}

export type HeaderConfig = {
	label?: string;
	content?: JSX.Element;
	onClick?: () => void;
	isActive?: boolean;
}