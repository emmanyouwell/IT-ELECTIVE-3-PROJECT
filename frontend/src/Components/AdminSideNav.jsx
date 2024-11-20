import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { getGroups, getGroupDetails, clearErrors } from '../Actions/groupActions';
import { getUser } from '../Actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
const AdminSideNav = ({ setGroup, setSelectedSubtopic }) => {
    const listItemRefs = useRef([]);
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const { user, isAuthenticated } = useSelector(state => state.auth)
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
    const { groups: allGroups, loading, error: allErrors } = useSelector(state => state.groups)
    const { groups, error } = useSelector(state => state.groupDetails);
    const handleClick = (menuItem) => {
        setGroup(menuItem);
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
        if (allErrors) {
            dispatch(clearErrors());
        }


        dispatch(getGroups());
        dispatch(getUser());
    }, [dispatch, error, allErrors])

    useEffect(()=>{
        if (allGroups){
            console.log("groups: ", allGroups);
        }
    },[allGroups])
    return (
        <Card className="h-screen w-72 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sticky top-0 border-2">
            <div className="mb-2 p-4">
                <Link to="/">
                    <Typography variant="h5" color="blue-gray">
                        IT PROFESSIONAL ELECTIVE 3 - BSIT S4A
                    </Typography>
                </Link>
            </div>
            <List className="h-full">

                {allGroups && allGroups.map((group, index) => (
                    <Accordion
                        open={open === index + 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === index + 1 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem
                            key={group._id}
                            onClick={() => handleTabClick(group._id)}

                            className="cursor-pointer p-2 rounded transition-colors font-bold"
                        >
                            <AccordionHeader onClick={() => handleOpen(index + 1)} className="border-b-0 p-3">

                                {group.topic}
                            </AccordionHeader>
                        </ListItem>
                        {/* <AccordionBody className="py-1">
                            <List className="p-0">
                                
                            </List>
                        </AccordionBody> */}
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                {group.subtopics && group.subtopics.length > 0 &&  group.subtopics.map((subtopic) => (
                                    <ListItem 
                                    key={subtopic._id}
                                    onClick={() => setSelectedSubtopic(subtopic._id)}>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        {subtopic.title}
                                    </ListItem>
                                ))}


                            </List>
                        </AccordionBody>
                    </Accordion>
                ))}
            </List>
        </Card>
    )
}

export default AdminSideNav