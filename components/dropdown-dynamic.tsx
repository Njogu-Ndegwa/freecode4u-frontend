'use client'

import { useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Transition,
    TransitionChild,
    Dialog,
    DialogPanel
} from '@headlessui/react'
import { useSelectedItems } from '@/app/selected-items-context';
import ModalBlank from './modal-blank';
import { AgentInterface } from '@/app/(auth)/services/authService';
import FeedbackModal from './feedback-modal';
interface OptionInterface {
    id: number;
    value: string;
}

export default function DropdownFull(
    { options, onDropdownItemSelect }: {  options: any, onDropdownItemSelect:any }) {
    const { selectedItems } = useSelectedItems()
    const [selected, setSelected] = useState<number>(0)


    const handleSelect = (option: OptionInterface) => {
        onDropdownItemSelect(option)
    }

    return (
        <div className={`${selectedItems.length < 1 && 'hidden'}`}>
            <div className="flex items-center">
                <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> items selected</div>
                <Menu as="div" className="relative inline-flex w-full">
                    {({ open }) => (
                        <>
                            <MenuButton className="btn w-full justify-between min-w-[11rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100" aria-label="Select option">
                                <span className="flex items-center">
                                    <span>{options[selected].value}</span>
                                </span>
                                <svg className="shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" width="11" height="7" viewBox="0 0 11 7">
                                    <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                                </svg>
                            </MenuButton>
                            <Transition
                                as="div"
                                className="z-10 absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
                                enter="transition ease-out duration-100 transform"
                                enterFrom="opacity-0 -translate-y-2"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-out duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <MenuItems className="font-medium text-sm text-gray-600 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700/60 focus:outline-none min-w-[16rem]">
                                    {options.map((option: any, optionIndex: any) => (
                                        <MenuItem key={optionIndex}>
                                            {({ active }) => (
                                                <button
                                                    className={`flex items-center justify-between w-full py-2 px-3 cursor-pointer ${active ? 'bg-gray-50 dark:bg-gray-700/20' : ''} ${option.id === selected && 'text-violet-500'}`}
                                                    onClick={() => { setSelected(option.id); handleSelect(option); }}
                                                >
                                                    <span>{option.value}</span>
                                                    <svg className={`shrink-0 mr-2 fill-current text-violet-500 ${option.id !== selected && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                                                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                                                    </svg>
                                                </button>
                                            )}
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>

            {/* <Transition appear show={isOpen}>
                <Dialog as="div" onClose={() => setIsOpen(false)}>
                    <TransitionChild
                        as="div"
                        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-out duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        aria-hidden="true"
                    />
                    <TransitionChild
                        as="div"
                        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0 translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-4"
                    >
                        <DialogPanel className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg">
                            <form className="border-b border-gray-200 dark:border-gray-700/60">
                                <div className="relative">
                                    <label htmlFor="search-modal" className="sr-only">Search</label>
                                    <input
                                        id="search-modal"
                                        className="w-full dark:text-gray-300 bg-white dark:bg-gray-800 border-0 focus:ring-transparent placeholder-gray-400 dark:placeholder-gray-500 appearance-none py-3 pl-10 pr-4"
                                        type="search"
                                        placeholder="Search for an agent…"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center right-auto group">
                                        <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-4 mr-2" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                                            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </form>
                            <div className="py-4 px-2">
                                <div className="mb-3 last:mb-0">
                                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">Recent searches</div>
                                    <ul className="text-sm">
                                        {filteredAgents.map((agent) => (
                                            <li key={agent.id} className="mb-2 last:mb-0">
                                                <button
                                                    className={`flex items-center p-2 w-full text-left ${selectedAgentId === agent.id
                                                        ? 'text-violet-500'
                                                        : 'text-gray-800 dark:text-gray-100'
                                                        } hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg`}
                                                    onClick={() => handleAgentSelect(agent.id)}
                                                >
                                                    {agent.email}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-3 mt-3 last:mb-0">
                                    <div className="flex flex-wrap justify-end space-x-2">
                                        <button className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300" onClick={() => { setIsOpen(false) }}>Cancel</button>
                                        <button
                                            className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                                            onClick={selected === 1
                                                ? () => handleActionClick('assign')
                                                : () => handleActionClick('reAssign')} >{selected === 1 ? 'Assign Item' : 'Re-assign Item'}</button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition> */}
        </div>
    )
}