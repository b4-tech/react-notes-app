import React, { useState } from 'react';
import Modal from 'react-modal';
import NoteForm from './NoteForm';
import { Note } from '../models/models';
import editIcon from '../assets/edit.svg';

interface NoteModalButtonProps {
	note?: Note;
}

const NoteModalButton: React.FC<NoteModalButtonProps> = ({ note }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<div>
			<div onClick={() => setModalIsOpen(true)}>
				{note ?
					<img src={editIcon} alt="Edit" className='item__ico' />
					:
					<button className='create-note-btn'>Create Note</button>
				}
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel={note ? "Edit Note" : "Create Note"}
				style={{
					content: {
						background: 'none',
						border: 'none'
					}
				}}
			>
				<NoteForm note={note} closeModal={() => setModalIsOpen(false)} />
			</Modal>
		</div >
	);
};

export default NoteModalButton;
