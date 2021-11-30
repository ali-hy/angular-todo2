
export interface category_type{
	id: number,
	cat_name: string
}
export const mock_categories:category_type[] = [
	{id: 0, cat_name: "Work",},
	{id: 1, cat_name:"Hobbies",},
	{id: 2, cat_name:"Groceries",},
	{id: 3, cat_name:"Chores"},
]
export interface Task{
	id: number,
	title: string,
	description?: string,
	creationDate: Date,
	completed?: boolean,
	category?: category_type,
}