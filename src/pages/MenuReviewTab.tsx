import { useState } from "react";
import { MenuDetail } from "./Menu/MenuDetail";
import { ReviewListPage } from "./Review/ReviewListPage";
import { Tabs } from "antd";
import { Desc, TabMenu } from "../components/Tab";

export const MenuReviewTab = (): JSX.Element => {

    const items = [
        { key: 'MenuDetail', name: '메뉴', content: <MenuDetail /> },
        { key: 'ReviewListPage', name: '리뷰', content: <ReviewListPage /> }
    ];
    const [activeTab, setActiveTab] = useState(0);

    const selectMenuHandler = (key: any) => {
        setActiveTab(key);
    };

    return (
        <li>
            <Tabs>
                <div>
                    <TabMenu>
                        {items.map((tab, index) => (
                            <div 
                                id="tab"
                                key={index}
                                className={activeTab === index ? 'submenu focused' : 'submenu'}
                                onClick={() => selectMenuHandler(index)}
                            >
                                {tab.name}
                            </div>
                        ))}
                    </TabMenu>
                </div>
                <Desc>
                    {items[activeTab].content}</Desc>
            </Tabs>
        </li>
    );
};
