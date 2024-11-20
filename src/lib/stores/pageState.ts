import { toStore, fromStore } from 'svelte/store';
import { pushState } from '$app/navigation';
import { page } from '$app/stores';

export const pageState = () => {
	const pageStore = fromStore(page);

	function getPage() {
		const pageParam = pageStore.current.url.searchParams.get('page') || 1;
		const page = Number(pageParam);

		return !Number.isNaN(page) ? page : 1;
	}

	function setPage(page: number) {
		if (page !== 1 && !Number.isNaN(page)) {
			pageStore.current.url.searchParams.set('page', String(page));
			pushState(`?${pageStore.current.url.searchParams}`, pageStore.current.state);
			return;
		}

		pageStore.current.url.searchParams.delete('page');
		pushState(`?${pageStore.current.url.searchParams}`, pageStore.current.state);
	}

	return toStore(getPage, setPage);
};
