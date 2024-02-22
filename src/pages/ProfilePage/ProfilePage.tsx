import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../services/endpoints/listEndpoints';
import {ProfileInfo} from '../../components/Profile/ProfileInfo';
import { Container } from '../../components';
import { EditProfileBlock } from '../../components/blockComponents/EditProfileBlock/EditProfileBlock';

export const ProfilePage = () => {
    const { id } = useParams()
    const { data: user } = useGetUserQuery(id as string)

    return (
        <Container>
            <ProfileInfo user={user} />
            <EditProfileBlock user={user}/>
        </Container>
    );
};