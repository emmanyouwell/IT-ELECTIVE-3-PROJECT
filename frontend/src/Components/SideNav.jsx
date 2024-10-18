import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { getGroups, clearErrors } from '../Actions/groupActions';
import { useDispatch, useSelector } from 'react-redux';

const SideNav = ({ setGroup }) => {
    const listItemRefs = useRef([]);


    const handleTabClick = (groupId, index) => {
        // Reset background color for all list items
        listItemRefs.current.forEach((item) => {
            if (item) {
                item.style.backgroundColor = 'white';
                item.style.color = 'black';
            }
        });

        // Set background color for the clicked list item
        if (listItemRefs.current[index]) {
            listItemRefs.current[index].style.backgroundColor = 'black';
            listItemRefs.current[index].style.color = 'white';
        }

        handleClick(groupId);
    };
    const dispatch = useDispatch()
    const { groups, loading, error } = useSelector(state => state.groups)
    const { groups: index, error: detailError } = useSelector(state => state.groupDetails);
    const handleClick = (menuItem) => {
        setGroup(menuItem);
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors())
        }
        dispatch(getGroups())
    }, [dispatch, error])

    return (


        <Card className="h-screen w-64 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sticky top-0">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    IT PROFESSIONAL ELECTIVE 3 - BSIT S4A
                </Typography>
            </div>
            <List>
                {groups && groups.map((group, index) => (
                    <ListItem
                        key={group._id}
                        onClick={() => handleTabClick(group._id, index)}
                        ref={(el) => (listItemRefs.current[index] = el)}
                        className="cursor-pointer p-2 rounded transition-colors"
                    >
                        <ListItemPrefix>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                        </ListItemPrefix>
                        GROUP {group.group}
                    </ListItem>
                ))}
            </List>
        </Card>


    );
}

export default SideNav;