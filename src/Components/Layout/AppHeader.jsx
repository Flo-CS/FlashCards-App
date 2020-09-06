import React from "react"

import {Button, Icon, Input, Menu} from "semantic-ui-react";

export default function AppHeader() {
    return (<Menu>
        <Menu.Item>
            <Button icon>
                <Icon name='bars'/>
            </Button>
        </Menu.Item>
        <Menu.Item>
            <Input icon={<Icon name="search"/>} placeholder="Search for card(s)..."/>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item>
                <Button icon>
                    <Icon name="add"/>
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button icon>
                    <Icon name="settings"/>
                </Button>
            </Menu.Item>
        </Menu.Menu>
    </Menu>)
}