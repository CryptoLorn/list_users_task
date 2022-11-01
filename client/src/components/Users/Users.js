import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";

import "./Users.css";
import {userService} from "../../services/user.service";
import User from "../User/User";

const Users = () => {
    const [users, setUsers] = useState([]);
    const {handleSubmit, register, reset, setValue} = useForm();
    const [isAdd, setIsAdd] = useState(null);
    const [isDelete, setIsDelete] = useState(null);
    const [isUpdate, setIsUpdate] = useState(null);
    const [userForUpdate, setUserForUpdate] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        userService.getAll().then(value => setUsers([...value]));

        if (userForUpdate) {
            setValue('name', userForUpdate.name);
            setValue('rank', userForUpdate.rank);
        }

    }, [isAdd, isDelete, isUpdate, userForUpdate])

    const addUser = async (user) => {
        if (isAdd === true) {
            setIsAdd(null);
        } else if (error) {
            setError(null);
        }

        await userService
            .create(user)
            .then(value => setIsAdd(true))
            .catch(error => setError(error.response.data.message));
        reset();
    }

    const updateUser = async (user) => {
        if (error) {
            setError(null);
        }

        await userService
            .updateById(userForUpdate.id, {name: user.name, rank: user.rank})
            .then(value => setUserForUpdate(null))
            .catch(error => setError(error.response.data.message));
        reset();
    }

    return (
        <div>
            <div className={'users_form'}>
                <form>
                    <input type={'text'} placeholder={'name'} {...register('name')}/>
                    <input type={'number'} placeholder={'rank'} {...register('rank')}/>
                </form>
                <button onClick={userForUpdate ? handleSubmit(updateUser) : handleSubmit(addUser)}>
                    {userForUpdate ? 'Update' : 'Add'}
                </button>
            </div>
            {error ? <span className={'error'}>{error}</span> : null}

            <div className={'headlines'}>
                <span className={'user_id'}>id</span>
                <span className={'user_name'}>name</span>
                <span className={'user_rank'}>rank</span>
            </div>
            <div className={'user_list'}>
                {users.map(user => <User
                    key={user.id}
                    user={user}
                    setIsDelete={setIsDelete}
                    isDelete={isDelete}
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                    setUserForUpdate={setUserForUpdate}
                />)}
            </div>
        </div>
    );
};

export default Users;