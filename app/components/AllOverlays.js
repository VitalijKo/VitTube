'use client'

import { useGeneralStorage } from '../storage/general';
import ClientOnly from './ClientOnly';
import AuthOverlay from './AuthOverlay';
import EditProfileOverlay from './profile/EditProfileOverlay';

export default function AllOverlays() {
    let { loginOpen, isEditProfileOpen } = useGeneralStorage();

    return (
        <>
            <ClientOnly>
                {loginOpen ? <AuthOverlay /> : null}
                {isEditProfileOpen ? <EditProfileOverlay /> : null}
            </ClientOnly>
        </>
    );
}
