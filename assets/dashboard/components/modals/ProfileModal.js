import React from 'react'
import Modal from './Modal';
import Profile from '../../pages/Profile';

export default function ProfileModal() {
    return <Modal id="profileModal" content={<Profile />} />;
}
