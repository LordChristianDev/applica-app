export const getStatusIconClass = (status: 'Applied' | 'Interview' | 'Offer' | 'Rejected') => {
	const classes = {
		Applied: 'bg-blue-500',
		Interview: 'bg-yellow-500',
		Offer: 'bg-green-500',
		Rejected: 'bg-red-500'
	}
	return classes[status] || 'bg-gray-500'
};

export const getStatusClass = (status: 'Applied' | 'Interview' | 'Offer' | 'Rejected') => {
	const classes = {
		Applied: 'bg-blue-100 text-blue-700',
		Interview: 'bg-yellow-100 text-yellow-700',
		Offer: 'bg-green-100 text-green-700',
		Rejected: 'bg-red-100 text-red-700'
	}
	return classes[status] || 'bg-gray-100 text-gray-700'
};