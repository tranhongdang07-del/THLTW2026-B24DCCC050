import { useEffect } from 'react';
import { history } from 'umi';

export default () => {
	useEffect(() => {
		history.replace('/th04/search');
	}, []);

	return null;
};
