import { setActive, setArchived } from '../redux/slices/viewModeSlice';
import { selectSummary, selectViewMode } from '../redux/store/selectors';
import { useAppDispatch, useAppSelector } from '../redux/store/store';

const SummaryTable = () => {
	const dispatch = useAppDispatch();
	const viewMode = useAppSelector(selectViewMode);
	const summary = useAppSelector(selectSummary);

	return (
		<table>
			<thead>
				<tr className='categories-header '>
					<th></th>
					<th>Note Category</th>
					<th onClick={() => dispatch(setActive())} className={viewMode === 'active' ? 'active-tab' : ''}>Active</th>
					<th onClick={() => dispatch(setArchived())} className={viewMode === 'archived' ? 'active-tab' : ''}>Archived</th>
				</tr>
			</thead>
			<tbody>
				{summary.map(row => (
					<tr key={row.id} className='item2'>
						<td>
							<img className='item__ico' src={row.iconPath} alt={row.name + " icon"} />
						</td>
						<td>
							{row.name}
						</td>
						<td>{row.active}</td>
						<td>{row.archived}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default SummaryTable;