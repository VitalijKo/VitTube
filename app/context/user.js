'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useGetProfileByUserId from '../hooks/useGetProfileByUserId';
import useCreateProfile from '../hooks/useCreateProfile';
import { account, ID } from '@/libs/AppWriteClient';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState(null);

	const checkUser = async () => {
		try {
			const currentSession = await account.getSession('current');

			if (!currentSession) return;

			const promise = await account.get();
			const profile = await useGetProfileByUserId(promise?.$id);

			setUser({
				id: promise?.$id,
				name: promise?.name, 
				bio: profile?.bio,
				image: profile?.image
			});
		} catch (e) {
			setUser(null);
		}
	};

	useEffect(() => { checkUser() }, []);

	const signup = async (name, email, password) => {
		try {
			const promise = await account.create(ID.unique(), email, password, name);

			await account.createEmailSession(email, password);
			await useCreateProfile(promise?.$id, name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID), '');
			await checkUser();
		} catch (e) {
			console.error(e);

			throw error;
		}
	};

	const login = async (email, password) => {
		try {
			await account.createEmailSession(email, password);

			checkUser();
		} catch (e) {
			console.error(e);
		}
	};

	const logout = async () => {
		try {
			await account.deleteSession('current');

			setUser(null);

			router.refresh();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<UserContext.Provider value={{ user, signup, login, logout, checkUser }}>
				{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
