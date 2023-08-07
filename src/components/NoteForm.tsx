import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addNote, editNote } from '../redux/slices/notesSlice';
import { FormData, Note } from '../models/models';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { selectCategories } from '../redux/store/selectors';
import { customAlphabet } from 'nanoid';
import InputWithLabel from './InputWithLabel';

interface NoteFormProps {
	note?: Note;
	closeModal: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, closeModal }) => {
	const { register, handleSubmit, setValue, reset } = useForm<FormData>();
	const dispatch = useAppDispatch();
	const categories = useAppSelector(selectCategories);
	const nanoid = customAlphabet('0123456789', 10);
	
	useEffect(() => {
		if (note) {
			setValue('name', note.name);
			setValue('category', categories.find(category => category.id === note?.category)?.name ?? '');
			setValue('content', note.content);
			setValue('active', note.active);
		}
	}, [categories, note, setValue]);

	const onSubmit = (data: FormData) => {
		const noteData = {
			id: note ? note.id : Number(nanoid()),
			name: data.name,
			created: note ? note.created : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
			content: data.content,
			category: categories.find(category => category.name === data.category)?.id || 1,
			active: data.active
		};

		note ? dispatch(editNote(noteData)) : dispatch(addNote(noteData));
		reset();
		closeModal();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form-note'>
			<h1 className='form-note__title'>{note ? 'Edit Note' : 'Create Note'}</h1>
            
			<InputWithLabel
				registerOptions={{ required: true }}
				label="Name:"
				id="name"
				register={register}
			/>

			<InputWithLabel
				registerOptions={{ required: true }}
				label="Category:"
				id="category"
				elementType="select"
				register={register}
			>
				{categories.map(({id, name}) => (
					<option key={id} value={name}>
						{name}
					</option>
				))}
			</InputWithLabel>

			<InputWithLabel
				registerOptions={{ required: true }}
				label="Content:"
				id="content"
				elementType="textarea"
				register={register}
			/>

			<InputWithLabel
				label="Active:"
				id="active"
				elementType="checkbox"
				defaultChecked={true}
				register={register}
			/>

			<div>
				<button className='form-note__button1' type="submit">{note ? 'Update' : 'Create'}
				</button>
				<button className='form-note__button2' type="button" onClick={() => {
					reset();
					closeModal();
				}}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default NoteForm;