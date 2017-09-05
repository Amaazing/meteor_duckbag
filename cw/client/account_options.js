AccountsTemplates.addFields([
	{
		_id : "name",
		type: "text",
		displayName: "Name",
		required: true,
		re: /[A-Za-z][A-Za-z]{2,50}/,
		errStr: "Minimum 2 characters, maximum 50."
	}
]);