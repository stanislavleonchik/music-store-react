import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import store from './store.png';
import music1 from './music5.png';
import music2 from './music4.png';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const initialNewsData = [
        {
            id: 1,
            title: "Новое поколение аудиоинтерфейсов от StudioGear",
            description: "StudioGear анонсировала выпуск новой серии профессиональных аудиоинтерфейсов, обещающих революционное улучшение качества звука и скорости обработки.",
            date: "2024-05-16"
        },
        {
            id: 2,
            title: "Обновление линейки студийных мониторов ProSound",
            description: "ProSound выпустила обновленную линейку студийных мониторов, предлагающую улучшенные характеристики точности воспроизведения звука для профессиональных звукорежиссеров.",
            date: "2024-05-15"
        },
        {
            id: 3,
            title: "Топ-5 новинок в области музыкального оборудования 2024 года",
            description: "Подробный обзор пяти самых ожидаемых новинок в области музыкальной аппаратуры этого года, включая последние модели синтезаторов, микшерных пультов и аудиоинтерфейсов.",
            date: "2024-05-14"
        }
    ]
;

const productData = [
        {
            id: 1,
            product: "Многоканальный микрофонный предусилитель MultiPre-8",
            description: "Высококачественный восьмиканальный микрофонный предусилитель с функцией аудиоинтерфейса USB, обеспечивающий превосходное звукопередачу для студийной записи.",
            price: "42000 руб."
        },
        {
            id: 2,
            product: "Аналоговый синтезатор SynthMaster V3",
            description: "Флагманский аналоговый синтезатор с расширенными возможностями модуляции и инновационным интерфейсом для профессиональных музыкантов и звукорежиссеров.",
            price: "78000 руб."
        },
        {
            id: 3,
            product: "Цифровая звуковая рабочая станция (DAW) StudioOne Pro",
            description: "Программное обеспечение для создания и обработки музыки, предоставляющее комплексные инструменты для композиции, записи и микширования музыкальных треков.",
            price: "12500 руб."
        }
    ]
;

const NewsItem = ({ id, title, description, date, onEdit, onDelete, canEdit }) => (
    <div className="news-item">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="news-date">{date}</p>
        {canEdit && (
            <>
                <button onClick={() => onEdit({ id, title, description, date })}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </>
        )}
    </div>
);

const NewsForm = ({ onSave, initialData = {} }) => {
    const [newsItem, setNewsItem] = useState(initialData);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewsItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(newsItem);
        navigate('/');  // navigate back to news list after saving
    };

    return (
        <article className="main-content">
            <form onSubmit={handleSubmit} className="news-form">
                <input type="text" name="title" value={newsItem.title || ''} onChange={handleChange} placeholder="Title"
                       required/>
                <textarea name="description" value={newsItem.description || ''} onChange={handleChange}
                          placeholder="Description" required/>
                <input type="date" name="date" value={newsItem.date || ''} onChange={handleChange} required/>
                <button type="submit">Save News</button>
            </form>
        </article>
    );
};

const News = ({ newsData, canEdit, onAddNews, onEdit, onDelete }) => (
    <article className="main-content">
        <h2>Новости</h2>
        {canEdit && <button onClick={() => onAddNews()}>Добавить новость</button>}
        {newsData.map(news => (
            <NewsItem
                key={news.id}
                {...news}
                canEdit={canEdit}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </article>
);

const ProductForm = ({ onSave, initialData = {} }) => {
    const [product, setProduct] = useState(initialData);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(product);
        navigate('/products');  // navigate back after saving
    };

    return (
        <article className="main-content">
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" name="product" value={product.product || ''} onChange={handleChange} placeholder="Product Name" required/>
                <input type="text" name="description" value={product.description || ''} onChange={handleChange} placeholder="Description" required/>
                <input type="text" name="price" value={product.price || ''} onChange={handleChange} placeholder="Price" required/>
                <button type="submit">Save Product</button>
            </form>
        </article>
    );
};


const ProductsServices = ({ products, onEdit, onDelete, canEdit }) => (
    <article className="main-content">
        <h2>Продукты и услуги</h2>
        {canEdit && <button onClick={() => onEdit({ product: '', description: '', price: '' })}>Add Product</button>}
        <table>
            <thead>
            <tr>
                <th>Продукт</th>
                <th>Описание</th>
                <th>Цена</th>
                {canEdit && <th>Actions</th>}
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                    <td>{product.product}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    {canEdit && (
                        <td>
                            <button onClick={() => onEdit(product)}>Edit</button>
                            <button onClick={() => onDelete(product.id)}>Delete</button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    </article>
);


const AboutOwner = () => (
    <article className="main-content">
        <h2>Екатерина Блинова</h2>
        <p>Южный Федеральный Университет</p>
        {/* Additional content about the owner */}
    </article>
);

const FeedBack = () => (
    <article className="main-content">
        <h2>Обратная связь</h2>
        <p>blino@sfedu.ru</p>
        <p>8-800-555-35-35</p>
        {/* Additional content about the owner */}
    </article>
);

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // event.preventDefault();
        onLogin(username, password);
    };

    return (
        <article className="main-content">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </article>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newsData, setNewsData] = useState(initialNewsData);
    const [currentNewsItem, setCurrentNewsItem] = useState(null);
    const [products, setProducts] = useState(productData);
    const [currentProduct, setCurrentProduct] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (username, password) => {
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };


    const handleSaveNews = (newsItem) => {
        if (newsItem.id) {
            setNewsData(newsData.map(item => item.id === newsItem.id ? {...item, ...newsItem} : item));
        } else {
            const newNewsItem = {...newsItem, id: newsData.length + 1};
            setNewsData([...newsData, newNewsItem]);
        }
        navigate('/');
    };

    const handleEditNews = (newsItem) => {
        setCurrentNewsItem(newsItem);
        navigate('/news-form');
    };

    const handleDeleteNews = (id) => {
        const updatedNewsData = newsData.filter(item => item.id !== id);
        setNewsData(updatedNewsData);
    };

    const onAddNews = (newsItem = { title: '', description: '', date: new Date().toISOString().slice(0, 10) }) => {
        setCurrentNewsItem(newsItem);
        navigate('/news-form');
    };

    const handleSaveProduct = (product) => {
        if (product.id) {
            setProducts(products.map(item => item.id === product.id ? { ...item, ...product } : item));
        } else {
            const newProduct = { ...product, id: products.length + 1 };
            setProducts([...products, newProduct]);
        }
        navigate('/products');
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        navigate('/product-form');
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(item => item.id !== id));
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Магазин профессиональной музыкальной аппаратуры</h2>
                {isLoggedIn ? (
                    <div>
                        <button onClick={handleLogout}>Выход</button>
                    </div>
                ) : (
                    <Link to="/login" className={"login-section"}>Войти</Link>
                )}
            </header>
            <div className="content-area">
                <section className="sidebar">
                    <nav>
                        <ul>
                            <li><Link to="/">Новости</Link></li>
                            {isLoggedIn && <li><Link to="/news-form">Добавить новость</Link></li>}
                            <li><Link to="/about-owner">О создателе</Link></li>
                            <li><Link to="/feedback">Обратная связь</Link></li>
                            <li><Link to="/products">Продукты и услуги</Link></li>
                            {isLoggedIn && <li><Link to="/product-form">Добавить продукт</Link></li>}
                        </ul>
                    </nav>
                </section>
                    <Routes>
                        <Route path="/" element={
                            <News
                                newsData={newsData}
                                canEdit={isLoggedIn}
                                onAddNews={onAddNews}
                                onEdit={handleEditNews}
                                onDelete={handleDeleteNews}
                            />
                        }/>
                        <Route path="/news-form"
                               element={<NewsForm onSave={handleSaveNews} initialData={currentNewsItem || {}}/>}/>
                        <Route path="/about-owner" element={<AboutOwner/>}/>
                        <Route path="/feedback" element={<FeedBack/>}/>
                        <Route path="/products" element={
                            <ProductsServices
                                products={products}
                                onEdit={handleEditProduct}
                                onDelete={handleDeleteProduct}
                                canEdit={isLoggedIn}
                            />
                        }/>
                        <Route path="/product-form"
                               element={<ProductForm onSave={handleSaveProduct} initialData={currentProduct || {}}/>}/>

                        <Route path="/login" element={<LoginForm onLogin={handleLogin}/>}/>
                    </Routes>
                <aside className="sidebar-right">
                    <img src={music1} className="store" alt="logo"/>
                    <img src={music2} className="store" alt="logo"/>
                </aside>
            </div>
            <footer className="App-footer">
                Сайт создан 2024-05-17 © Екатерина Блинова
            </footer>
        </div>
    );
}

export default App;
