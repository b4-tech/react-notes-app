import { useState } from 'react';
import { archiveNote, removeNote, unarchiveNote } from '../redux/slices/notesSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/store';

import NoteModalButton from "./NoteModalButton";

import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import archiveIcon from '../assets/archive.svg';
import unarchiveIcon from '../assets/unarchive.svg';
import { selectNotesToDisplay, selectCategories } from '../redux/store/selectors';
import { HeaderConfig } from '../models/models';
import GenericTable from './GenericTable';

const NotesTable = () => {
	const notesToDisplay = useAppSelector(selectNotesToDisplay);
	const categories = useAppSelector(selectCategories);
	const dispatch = useAppDispatch();

	const datesRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;


	const [expandedNotes, setExpandedNotes] = useState<number[]>([]);

	const handleContentClick = (noteId: number) => {
		setExpandedNotes(prevNotes => 
			prevNotes.includes(noteId) 
			? prevNotes.filter(id => id !== noteId) 
			: [...prevNotes, noteId]
		);
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

	const findCategoryById = (id: number) => {
        return categories.find(cat => cat.id === id);
    };

	return (
		<GenericTable headers={headersConfig} rowClassName={'notes-header'}>
			{notesToDisplay.map((note) => {
				const {category, id, content,created, name, active} = note

				const noteCategory = findCategoryById(category);
				const dates = (content.match(datesRegex) || []).join(", ");
				const isExpanded = expandedNotes.includes(id);
				const shouldShorten = content.length > 5 && !isExpanded;
				return (
					<tr className='item' key={id}>
						<td >
							{noteCategory && <img className='item__ico' src={noteCategory.iconPath} alt={noteCategory.name} style={{ marginRight: '5px' }} />}
						</td>
						<td >
							{name}
						</td>
						<td>{created}</td>
						<td>{noteCategory ? noteCategory.name : ''}</td>
						<td onClick={() => handleContentClick(id)}
							style={{
								maxWidth: '120px',
								overflow: 'hidden',
								textOverflow: shouldShorten ? 'ellipsis' : 'clip',
								whiteSpace: isExpanded ? 'normal' : 'nowrap',
								cursor: 'pointer'
							}}
							title={content}
						>
							{content}
						</td>
						<td>{dates}</td>
						<td>
							<NoteModalButton note={note} />
						</td>
						<td>
							<div onClick={() => active ? dispatch(archiveNote(id)) : dispatch(unarchiveNote(id))}>
								<img src={active ? archiveIcon : unarchiveIcon} alt="Archive" className='item__ico' />
							</div>
						</td>
						<td>
							<div onClick={() => dispatch(removeNote(id))}>
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