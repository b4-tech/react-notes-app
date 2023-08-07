import { Note } from "../models/models";

const Notes: Note[] = [
	{
		id: 1, name: 'Book', created: 'April 20, 2023', content: 'Read new book', category: 1, active: true,
	},
	{
		id: 2, name: 'Shop', created: 'April 17, 2023', content: 'Tea, Bread', category: 1, active: true,
	},
	{
		id: 3, name: 'Denis', created: 'April 15, 2023', content: 'I have to call Dennis 7/4/2022', category: 1, active: true,
	},
	{
		id: 4, name: 'Dentist', created: 'April 14, 2023', content: "I'm gonna have a dentist appointment on the 15/6/2023, I moves it From 20/7/2022", category: 1, active: true,
	},
	{
		id: 5, name: 'New Feature', created: 'April 10, 2023', content: 'Implement new feature', category: 2, active: false,
	},
	{
		id: 6, name: 'The Theory Of Evolution', created: 'April 5, 2023', content: 'Read new book', category: 3, active: true,
	},
	{
		id: 7, name: 'New project', created: 'April 2, 2023', content: 'Idea of the new', category: 2, active: true,
	},
];

export default Notes;