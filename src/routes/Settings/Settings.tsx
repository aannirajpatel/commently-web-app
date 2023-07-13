import React from "react";
import { Input } from "semantic-ui-react";
import { RequiresAuth } from "../../auth/RequiresAuth";
import { ToastQueries } from "../../shared/ToastQueries";

export function Settings() {
    return (<>
        <RequiresAuth noAuthToast={ToastQueries.AuthNeededInfo} />
        <div>
            <h1>Settings</h1>
            <div>
                <Input
                    action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'check',
                        content: 'Update',
                    }}
                    placeholder="Enter a new username"
                />
            </div>
        </div>
    </>);
}