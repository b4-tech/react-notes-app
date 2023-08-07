import { archiveNote, removeNote, unarchiveNote } from '../redux/slices/notesSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/store';

import NoteModalButton from "./NoteModalButton";

import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import archiveIcon from '../assets/archive.svg';
import unarchiveIcon from '../assets/unarchive.svg';
import { selectNotesToDisplay, selectCategories } from '../redux/store/selectors';
import { useState } from 'react';

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

	return (
		<table>
			<thead >
				<tr className='notes-header'>
					<th></th>
					<th>Name</th>
					<th>Created</th>
					<th>Category</th>
					<th>Content</th>
					<th>Dates</th>
					<th><img src={editIcon} alt='edit' className='item__ico' /></th>
					<th><img src={archiveIcon} alt='archive' className='item__ico' /></th>
					<th><img src={deleteIcon} alt='delete' className='item__ico' /></th>
				</tr>
			</thead>
			<tbody>
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
			</tbody>
		</table >
	);
}

export default NotesTable;