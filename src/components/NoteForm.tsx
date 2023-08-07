import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addNote, editNote } from '../redux/slices/notesSlice';
import { FormData, Note } from '../models/models';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { selectCategories } from '../redux/store/selectors';

interface NoteFormProps {
	note?: Note;
	closeModal: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, closeModal }) => {
	const { register, handleSubmit, setValue, reset } = useForm<FormData>();
	const dispatch = useAppDispatch();
	const categories = useAppSelector(selectCategories);


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
			id: note ? note.id : Math.random(),
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
			<label className='form-note__label1'>
				Name:
			</label>
			<input {...register('name', { required: true })} className='form-note__name' />
			<label className='form-note__label2 '>
				Category:
			</label>
			<select {...register('category', { required: true })} className='form-note__select'>
				{categories.map(category => (
					<option key={category.id} value={category.name}>
						{category.name}
					</option>
				))}
			</select>
			<label className='form-note__label3'>
				Content:
			</label>
			<textarea className='form-note__content' {...register('content', { required: true })} />
			<label className='form-note__label4'>
				Active:
				<input className='form-note__checkbox' type="checkbox" {...register('active')} defaultChecked={true} />
			</label>
			<div>
				<button className='form-note__button1' type="submit">{note ? 'Update' : 'Create'}</button>
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