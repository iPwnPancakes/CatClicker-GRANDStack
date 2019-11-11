import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";

export default function useDebouncedMutation(query, timer) {
    const [timeoutRef, setTimeoutRef] = useState(undefined);
    const [mutate, mutationStatus] = useMutation(query);

    const debounceMutation = (options) => {
        return new Promise((resolve, reject) => {
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
            setTimeoutRef(setTimeout(() => {
                resolve(mutate(options));
            }, timer))
        });
    };

    return [debounceMutation, { ...mutationStatus, timeoutRef }];
}