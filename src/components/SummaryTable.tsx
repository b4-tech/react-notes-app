import { HeaderConfig } from '../models/models';
import { setActive, setArchived } from '../redux/slices/viewModeSlice';
import { selectSummary, selectViewMode } from '../redux/store/selectors';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import GenericTable from './GenericTable';

const SummaryTable = () => {
	const dispatch = useAppDispatch();
	const viewMode = useAppSelector(selectViewMode);
	const summary = useAppSelector(selectSummary);

	const headersConfig: HeaderConfig[] = [
		{ label: '' },
		{ label: 'Note Category' },
		{
			label: 'Active',
			onClick: () => dispatch(setActive()),
			isActive: viewMode === 'active'
		},
		{
			label: 'Archived',
			onClick: () => dispatch(setArchived()),
			isActive: viewMode === 'archived'
		}
	];

	return (

		<GenericTable headers={headersConfig} rowClassName={'categories-header'}>
			{summary.map(row => (
				<tr key={row.id} className='item2'>
					<td><img className='item__ico' src={row.iconPath} alt={`${row.name} icon`} /></td>
					<td>{row.name}</td>
					<td>{row.active}</td>
					<td>{row.archived}</td>
				</tr>
			))}
		</GenericTable >
	)
}

export default SummaryTable;