// storage.ts (or any appropriate name)
export const users: { id: string; name: string }[] = [];

// Function to add a user to the users array
export const addUser = (user: { id: string; name: string }): void => {
    users.push(user);
};

// Function to fetch all users
export const fetchUsers = (): { id: string; name: string }[] => {
    return users;
};