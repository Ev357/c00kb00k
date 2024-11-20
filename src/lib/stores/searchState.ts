import { toStore, fromStore } from 'svelte/store';
import { replaceState } from '$app/navigation';
import { page as pageThing } from '$app/stores';

export const searchState = () => {
	const pageStore = fromStore(pageThing);

	function getSearch() {
		return pageStore.current.url.searchParams.get('search') ?? '';
	}

	function setSearch(search: string) {
		if (search !== '') {
			pageStore.current.url.searchParams.set('search', search);
			replaceState(`?${pageStore.current.url.searchParams}`, pageStore.current.state);
			return;
		}

		pageStore.current.url.searchParams.delete('search');
		replaceState(`?${pageStore.current.url.searchParams}`, pageStore.current.state);
	}

	return toStore(getSearch, setSearch);
};
