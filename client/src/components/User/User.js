import React from 'react';
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

import './User.css';
import {userService} from "../../services/user.service";

const User = ({user, setIsDelete, isDelete, setIsUpdate, isUpdate, setUserForUpdate}) => {
    const {id, name, rank} = user;

    const deleteUser = async () => {
        if (isDelete === true) {
            setIsDelete(null);
        }

        await userService.deleteById(id);
        setIsDelete(true);
    }

    const upUser = async () => {
        if (isUpdate === true) {
            setIsUpdate(null);
        }

        if (rank === 0) {
            alert('Sorry')
        }

        let newRank = rank - 1
        await userService.updateById(id, {rank: newRank}).then(value => setIsUpdate(true));
    }

    const downUser = async () => {
        if (isUpdate === true) {
            setIsUpdate(null);
        }

        let newRank = rank + 1
        await userService.updateById(id, {rank: newRank}).then(value => setIsUpdate(true));
    }

    return (
        <>
            <div className={'user_wrapper'}>
                <span className={'user_id'}>{id}:</span>
                <span className={'user_name'}>{name}</span>
                <span className={'user_rank'}>{rank}</span>
                <div className={'up_or_down'}>
                    <span>{rank === 0 ? null : <span className={'up'} onClick={upUser}><FaArrowUp/></span>}</span>
                    <span>{rank === 10 ? null : <span className={'down'} onClick={downUser}><FaArrowDown/></span>}</span>
                </div>
                <button onClick={() => setUserForUpdate(user)}>Update</button>
                <button onClick={deleteUser}>Delete</button>
            </div>
        </>
    );
};

export default User;