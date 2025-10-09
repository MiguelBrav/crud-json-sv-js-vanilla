import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import { saveUser } from "./usecases/saveuser";
import usersstore from "./store/usersstore";
export const UsersApp = async(element) => {
    element.innerHTML = 'Loading...';

    await usersstore.loadNextPage();

    element.innerHTML = '';

    renderTable(element);

    renderButtons(element);

    renderAddButton(element);

    renderModal(element, async (userLike) => {
        const user = await saveUser(userLike);
        await usersstore.onUserChanged(user);

        renderTable();
    });
}

