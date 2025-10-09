import usersstore from "../../store/usersstore";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";

export const renderButtons = (element) => {


    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersstore.getCurrentPage();
    element.append(prevButton, currentPageLabel, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersstore.loadNextPage();
        currentPageLabel.innerText = usersstore.getCurrentPage();

        renderTable(element);
    });

    prevButton.addEventListener('click', async() => {
        await usersstore.loadPreviousPage();
        currentPageLabel.innerText = usersstore.getCurrentPage();

        renderTable(element);
    });

    
}