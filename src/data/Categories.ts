import { Category } from "../models/models";
import taskIcon from '../assets/task.svg';
import ideaIcon from '../assets/idea.svg';
import randomThoughtIcon from '../assets/randomThougth.svg';

const Categories: Category[] = [
	{ id: 1, name: 'Task', iconPath: taskIcon },
	{ id: 2, name: 'Idea', iconPath: ideaIcon },
	{ id: 3, name: 'Random Thought', iconPath: randomThoughtIcon },
];

export default Categories