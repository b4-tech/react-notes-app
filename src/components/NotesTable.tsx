import { archiveNote, removeNote, unarchiveNote } from '../redux/slices/notesSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/store';

import NoteModalButton from "./NoteModalButton";

import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import archiveIcon from '../assets/archive.svg';
import unarchiveIcon from '../assets/unarchive.svg';
import { selectNotesToDisplay, selectCategories } from '../redux/store/selectors';
import { useState } from 'react';
import { HeaderConfig } from '../models/models';
import GenericTable from './GenericTable';

const NotesTable = () => {

	const notesToDisplay = useAppSelector(selectNotesToDisplay);
	const categories = useAppSelector(selectCategories);
	const dispatch = useAppDispatch();

	const datesRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;


	const [expandedNotes, setExpandedNotes] = useState<number[]>([]);

	const handleContentClick = (noteId: number) => {
		if (expandedNotes.includes(noteId)) {
			setExpandedNotes(prevNotes => prevNotes.filter(id => id !== noteId));
		} else {
			setExpandedNotes(prevNotes => [...prevNotes, noteId]);
		}
	};


	const headersConfig: HeaderConfig[] = [
		{ label: '' },
		{ label: 'Name' },
		{ label: 'Created' },
		{ label: 'Category' },
		{ label: 'Content' },
		{ label: 'Dates' },
		{ content: <img src={editIcon} alt='edit' className='item__ico' /> },
		{ content: <img src={archiveIcon} alt='archive' className='item__ico' /> },
		{ content: <img src={deleteIcon} alt='delete' className='item__ico' /> }
	];


	return (
		<GenericTable headers={headersConfig} rowClassName={'notes-header'}>
			{notesToDisplay.map((note) => {
				const category = categories.find((cat) => cat.id === note.category);
				const dates = (note.content.match(datesRegex) || []).join(", ");
				const isExpanded = expandedNotes.includes(note.id);
				const shouldShorten = note.content.length > 5 && !isExpanded;
				return (
					<tr className='item' key={note.id}>
						<td >
							{category && <img className='item__ico' src={category.iconPath} alt={category.name} style={{ marginRight: '5px' }} />}
						</td>
						<td >
							{note.name}
						</td>
						<td>{note.created}</td>
						<td>{category ? category.name : ''}</td>
						<td onClick={() => handleContentClick(note.id)}
							style={{
								maxWidth: '120px',
								overflow: 'hidden',
								textOverflow: shouldShorten ? 'ellipsis' : 'clip',
								whiteSpace: isExpanded ? 'normal' : 'nowrap',
								cursor: 'pointer'
							}}
							title={note.content}
						>
							{note.content}
						</td>
						<td>{dates}</td>
						<td>
							<NoteModalButton note={note} />
						</td>
						<td>
							<div onClick={() => note.active ? dispatch(archiveNote(note.id)) : dispatch(unarchiveNote(note.id))}>
								<img src={note.active ? archiveIcon : unarchiveIcon} alt="Archive" className='item__ico' />
							</div>
						</td>
						<td>
							<div onClick={() => dispatch(removeNote(note.id))}>
								<img src={deleteIcon} alt="Delete" className='item__ico' />
							</div>
						</td>
					</tr>
				);
			})}
		</GenericTable >
	);
}

export default NotesTable;