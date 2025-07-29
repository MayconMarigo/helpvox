import { useState } from "react";
import {
  ListItemAnchor,
  ListItemContainer,
  NavigatorBody,
  NavigatorContainer,
  NavigatorHeader,
} from "./ListItemsWithAnimation.styles";
import Accordion from "shared/Accordion";
import { useRouter } from "next/navigation";
import { useUser } from "contexts/User/User";

const ListItem = ({ list, title, icon, handleSelect, selected }) => {
  const router = useRouter();
  const handleUrlChange = (url) => router.push(url);
  const { user } = useUser();

  return (
    <Accordion title={title} icon={icon} colorScheme={user.colorScheme}>
      {list?.map((item) => (
        <ListItemContainer
          colorScheme={user.colorScheme}
          key={item.title}
          onClick={handleSelect}
          selected={item.title == selected}
        >
          <ListItemAnchor
            onClick={() => handleUrlChange(`/authenticated/${item.url}`)}
          >
            {item.title}
          </ListItemAnchor>
        </ListItemContainer>
      ))}
    </Accordion>
  );
};

export default ListItem;
