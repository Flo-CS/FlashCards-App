import React from "react"

import {Button, Icon, Input, Menu} from "semantic-ui-react";

export default function AppHeader() {
    return (<Menu>
        <Menu.Item>
            <Button icon>
                <Icon name='bars' />
            </Button>
        </Menu.Item>
        <Menu.Item>
            <Input/>
        </Menu.Item>
            <Menu.Item position="right">
                <Button icon>
                <Icon name="settings"/>
                </Button>
            </Menu.Item>
    </Menu>)
}