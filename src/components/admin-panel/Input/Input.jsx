import {BiChevronDown, BiHide, BiShow} from "react-icons/bi";
import * as icons from "react-icons/bi";
import React, {useState} from "react";


export default function Input(
    {
        placeholder,
        label,
        type,
        inputClassName,
        labelClassName,
        value,
        onChange,
        onFocus,
        onBlur,
        ref,
        children,
        checked,
        className,
        showContent,
        setShowContent,
        selectedItem,
        renderButton,
        checkIcon,
        uncheckIcon,
        inputProps,
        defaultValue,
        id,
        name,
        onInput
    }
) {
        const CheckIcon = icons[checkIcon]
        const UncheckIcon = icons[uncheckIcon]
        const [showPass, setShowPass] = useState(false)
    return (
        <>
            {
                type === 'text' || type === 'number' ? (
                    <div className={`flex items-start flex-col gap-2 w-full ${className}`}>
                        {
                            label && (
                                <span className={`font-IranYekan-Medium text-xs ${labelClassName}`}>{label}</span>
                            )
                        }
                        <input onInput={onInput} name={name} id={id} defaultValue={defaultValue} ref={ref} onBlur={onBlur} value={value} onChange={onChange} onFocus={onFocus}
                               type={type} placeholder={placeholder}
                               className={`w-full h-10 rounded border border-zinc focus:border-blue outline-none placeholder:transition-all placeholder:duration-300 focus:placeholder:pr-2 px-4 transition-all focus:shadow-xs duration-300 font-IranYekan-Medium text-2sm placeholder:text-muted ${inputClassName}`}/>
                    </div>
                ) : type === 'textarea' ? (
                    <div className='flex items-start flex-col gap-2 w-full'>
                        <span className={`font-IranYekan-Medium text-xs ${labelClassName}`}>{label}</span>
                        <textarea onInput={onInput} name={name} id={id} value={value} placeholder={placeholder}
                                  className={`w-full h-24 rounded border border-zinc focus:border-blue outline-none placeholder:transition-all placeholder:duration-300 focus:placeholder:pr-2 p-4 transition-all focus:shadow-xs duration-300 font-IranYekan-Medium text-2sm placeholder:text-muted ${inputClassName}`}>
                        </textarea>
                    </div>
                ) : type === 'checkbox' && !checkIcon ? (
                    <div className={`flex items-start flex-col gap-2 w-full ${className}`}>
                        {label && <span className={`font-IranYekan-Medium text-xs ${labelClassName}`}>{label}</span>}
                        <input name={name} id={id} checked={checked} onChange={onChange} {...inputProps}
                               className={`shrink-0 w-[18px] h-[18px] appearance-none border checked:bg-check border-[#bec5cc] cursor-pointer rounded checked:bg-blue checked:border-blue checked:outline outline-1 outline-zinc ${inputClassName}`}
                               type="checkbox"/>
                    </div>
                ) : type === 'selectbox' ? (
                    <div className={`relative w-full ${className}`}>
                        <div className={`flex items-start flex-col ${label ? 'gap-2' : ''}`}>
                                    <span className={`font-IranYekan-Medium text-xs ${labelClassName}`}>
                                    {label}
                                </span>
                            {
                                renderButton ? (
                                    renderButton
                                ) : (
                                    <button onClick={() => setShowContent(prevState => !prevState)}
                                            className='flex items-center justify-between w-full h-10 rounded border border-zinc px-3 bg-white'>
                                        {
                                            selectedItem?.color ? (
                                                <span className='flex items-center gap-2'>
                                        <span style={{backgroundColor: selectedItem.color}}
                                              className='rounded-full w-2.5 h-2.5'></span>
                                        <span
                                            className='font-IranYekan-Medium text-2sm'>{selectedItem.title}</span>
                                    </span>
                                            ) : (
                                                <span
                                                    className='font-IranYekan-Medium text-2sm'>{placeholder}</span>
                                            )
                                        }
                                        <span className='text-muted'>
                                            <BiChevronDown size='20px'/>
                                        </span>
                                    </button>
                                )
                            }
                        </div>
                        <div
                            className={`bg-white absolute top-full left-0 right-0 shadow-md shadow-[#939eaa73] transition-all z-50 rounded-b ${showContent ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                            {
                                children
                            }
                        </div>
                    </div>
                ) : type === 'checkbox' && checkIcon ? (
                    <label
                        className="flex justify-between items-center gap-2 h-10">
                            <input id={id}
                                className="peer sr-only"
                                type="checkbox"
                                checked={checked}
                                onChange={onChange}
                            />
                            {
                                    label && (
                                    <span className="font-IranYekan-Bold text-2sm">
                                    {label}
                            </span>
                                )
                            }
                            <div
                                className="inline-flex justify-between items-center px-1 cursor-pointer h-5 before:shadow-xxs before:shadow-black/20 w-8 bg-[#e9ecee] relative rounded-2xl before:w-3.5 before:h-3.5 before:bg-white before:absolute before:left-0 before:transition-all before:translate-x-[22px] before:rounded-full before:top-0 before:bottom-0 before:my-auto peer-checked:before:bg-background border-2 border-transparent peer-checked:before:translate-x-[4px] peer-checked:bg-blue peer-focus:border-2 peer-focus:border-zinc transition-all !box-content overflow-hidden">
                                    <span className={`transition-all duration-300 text-white ${checked ? 'translate-x-0' : 'translate-x-5'}`}>
                                            <CheckIcon size='16px'/>
                                    </span>
                                    <span className={`transition-all duration-300 ${checked ? '-translate-x-5' : 'translate-x-0'}`}>
                                            <UncheckIcon size='16px'/>
                                    </span>
                            </div>
                    </label>
                ) : type === 'password' ? (
                    <div className={`flex items-start flex-col gap-2 w-full ${className}`}>
                            {
                                label && (
                                    <span className={`font-IranYekan-Medium text-xs ${labelClassName}`}>{label}</span>
                                )
                            }
                            <div className='relative w-full'>
                                    <input onInput={onInput} name={name} id={id} ref={ref} onBlur={onBlur} value={value} onChange={onChange} onFocus={onFocus}
                                           type={`${showPass ? 'text' : 'password'}`} placeholder={placeholder}
                                           className={`w-full h-10 shrink-0 rounded border border-zinc focus:border-blue outline-none placeholder:transition-all placeholder:duration-300 focus:placeholder:pr-2 px-4 transition-all focus:shadow-xs duration-300 font-IranYekan-Medium text-2sm placeholder:text-muted ${inputClassName}`}/>
                                    <span onClick={() => setShowPass(prevState =>  !prevState)} className='flex items-center justify-center absolute left-2 top-0 bottom-0 my-auto cursor-pointer'>
                                            {
                                                    showPass ? (
                                                        <BiShow size='16px'/>
                                                    ) : (
                                                        <BiHide size='16px'/>
                                                    )
                                            }
                                    </span>
                            </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}