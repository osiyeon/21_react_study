import axios from "axios";
import { useState } from "react";
import CardList from "./CardList";
import Pagination from "./Pagination";

const NavbarComp = () => {
    const [items, setItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    const [searchWord, setSearchWord] = useState("");
    const [disabled, setDisabled] = useState(false); // 제출 버튼을 클릭하자마자, 제출 버튼 비활성화 -> 이벤트 처리 완료 후 다시 활성화 시켜줌
    const [selectValue, setSelectValue] = useState("선택");

    const handleChange = (e) => {
        setSearchWord(e.target.value);
    };

    const handelSubmit = async (e) => {
        setDisabled(true);
        e.preventDefault(); // 양식 제출할 때 새로고침 일어나는데 SPA에서는 필요없는 동작이어서 막아줌
        await new Promise((r) => setTimeout(r, 1000)); // 1초 지연

        if (searchWord.trim().length === 0) {
            alert("검색어를 입력해주세요");
            setDisabled(false);

            // setItems([]);
        } else {
            await axios
                .get(`https://images-api.nasa.gov/search?q=${searchWord}`)
                .then((res) => {
                    setItems(res.data.collection.items);
                    if (res.data.collection.items.length === 0)
                        alert("검색 결과가 없습니다");
                    console.log(res.data.collection);
                })
                .catch((err) => {
                    console.log(err);
                });
            setDisabled(false);
            setSearchWord("");
        }
    };

    const handleSelect = (e) => {
        console.log(e.target.value);
    };

    const indexOfLastItems = currentPage * itemsPerPage;
    const indexOfFirstItems = indexOfLastItems - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItems, indexOfLastItems);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div class="container">
            <nav class="navbar navbar-dark bg-dark justify-content-center">
                <a class="navbar-brand" href="#">
                    NASA
                </a>
                {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                <form onSubmit={handelSubmit}>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <button
                                class="btn btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                선택
                            </button>
                            <div class="dropdown-menu">
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    value="Title"
                                    onClick={handleSelect}
                                >
                                    Title
                                </button>
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    value="Description"
                                    onClick={handleSelect}
                                >
                                    Description
                                </button>
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    value="Keyword"
                                    onClick={handleSelect}
                                >
                                    Keyword
                                </button>{" "}
                            </div>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Text input with dropdown button"
                            placeholder="검색어를 입력해주세요"
                            value={searchWord}
                            onChange={handleChange}
                        />
                        <button
                            class="btn btn-outline-success"
                            type="submit"
                            disabled={disabled}
                        >
                            검색
                        </button>
                    </div>
                </form>
            </nav>
            <CardList items={currentItems} />
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={items.length}
                paginate={paginate}
            />
        </div>
    );
};
// <!-- {items.length === 0 ? <div>해당 검색결과 없음</div> : <CardList items={currentItems} />} -->

export default NavbarComp;
