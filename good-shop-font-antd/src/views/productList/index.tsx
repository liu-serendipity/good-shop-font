import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { NavBar, SearchBar, Toast, CapsuleTabs, InfiniteScroll, List } from 'antd-mobile';
import { Box, Center } from '@/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopbagOutline } from 'antd-mobile-icons';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
import { useGoodsContext } from '@/hooks/useGoodsContext';
import { List as VirtualizedList, AutoSizer, WindowScroller } from 'react-virtualized';

const tabs = [
  {
    key: 'index',
    title: '推荐',
  },
  {
    key: 'new',
    title: '新品',
  },
  {
    key: 'price',
    title: '价格',
  },
];

const ProductList = () => {
  const navigate = useNavigate();
  const searchRef = useRef<SearchBarRef>(null);
  const [search] = useSearchParams();
  const { fetchSearch, searchList, searchData, setSearchList, setSearchData } = useGoodsContext();
  const from = search.get('from' || '');
  const categoryId = search.get('categoryId' || '');
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem('activeTab') ? JSON.parse(localStorage.getItem('activeTab') || '') : 'index',
  );
  const [keyword, setKeyword] = useState(
    localStorage.getItem('searchKey') ? JSON.parse(localStorage.getItem('searchKey') || '') : '',
  );
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (from) {
      searchRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTab', JSON.stringify(activeTab));
  }, [activeTab]);

  useEffect(() => {
    setHasMore(page <= searchData.totalPage);
  }, [page]);

  const fetch = async () => {
    const params = {
      keyword: keyword,
      orderBy: activeTab === 'index' ? '' : activeTab,
      pageNumber: page,
    };
    if (!from) {
      // @ts-ignore
      params['goodsCategoryId'] = categoryId ? JSON.parse(categoryId) : '';
    } else {
      if (!keyword) {
        return Promise.reject();
      }
    }
    await fetchSearch(params);
    setPage(page + 1);
  };

  const handleTabsChange = (e: any) => {
    setActiveTab(e);
    const path = window.location.pathname;
    const q = window.location.search;
    window.location.href = path + q;
    setKeyword('');
    localStorage.setItem('searchKey', '');
  };

  const onBack = () => {
    localStorage.removeItem('activeTab');
    localStorage.removeItem('searchKey');
    navigate(-1);
    setSearchList([]);
    setSearchData({});
  };

  const jumpToGoodsDetail = (id: string) => {
    navigate({ pathname: '/goodsDetail', search: `goodsId=${id}` });
    setSearchList([]);
    setSearchData({});
  };

  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: CSSProperties }) => {
    const item = searchList[index];
    if (!item) return;

    return (
      <List.Item
        key={key}
        style={style}
        onClick={() => jumpToGoodsDetail(item.goodsId)}
        prefix={
          <Center w='1rem' p='0.06rem'>
            <img src={item.goodsCoverImg} />
          </Center>
        }
        description={
          <Box>
            <Box w='2rem' fz='0.12rem' tof='ellipsis' of='hidden' ws='nowrap' pt='0.04rem'>
              {item.goodsIntro}
            </Box>
            <Box c='red'>￥ {item.sellingPrice}</Box>
          </Box>
        }
      >
        <Box w='2rem' fz='0.14rem' tof='ellipsis' of='hidden' ws='nowrap'>
          {item.goodsName}
        </Box>
      </List.Item>
    );
  };

  return (
    <div className='productList'>
      <Box w='100%' pos='fixed' bg='#fff' borderBottom={'1px solid #ebedf0'} zIndex={9}>
        <NavBar
          onBack={() => onBack()}
          right={
            <Center onClick={() => navigate('/cart')}>
              <ShopbagOutline fontSize={26} />
            </Center>
          }
        >
          <Box w='2.4rem'>
            <SearchBar
              placeholder='输入你要搜索的商品名称'
              ref={searchRef}
              onSearch={(val) => {
                if (!val) {
                  Toast.show('请输入搜索内容');
                  return;
                }
                localStorage.setItem('searchKey', JSON.stringify(val));
                const path = window.location.pathname;
                const q = window.location.search;
                window.location.href = path + q;
              }}
            />
          </Box>
        </NavBar>
      </Box>
      <Box pt='0.45rem' w='100%'>
        <CapsuleTabs onChange={handleTabsChange} defaultActiveKey={activeTab}>
          {tabs.map((item) => {
            return (
              <CapsuleTabs.Tab key={item.key} title={item.title}>
                <div>
                  {/* @ts-ignore */}
                  <WindowScroller
                    onScroll={({ scrollTop }) => {
                      console.log('scrollTop', scrollTop);
                    }}
                  >
                    {({ height, scrollTop, isScrolling }) => (
                      <List>
                        {/* @ts-ignore */}
                        <AutoSizer disableHeight>
                          {({ width }) => (
                            // @ts-ignore
                            <VirtualizedList
                              autoHeight
                              rowCount={searchList.length}
                              rowRenderer={rowRenderer}
                              width={width}
                              height={height}
                              rowHeight={113}
                              overscanRowCount={10}
                              isScrolling={isScrolling}
                              scrollTop={scrollTop}
                            />
                          )}
                        </AutoSizer>
                      </List>
                    )}
                  </WindowScroller>
                  <InfiniteScroll loadMore={fetch} hasMore={hasMore} />
                </div>
              </CapsuleTabs.Tab>
            );
          })}
        </CapsuleTabs>
      </Box>
    </div>
  );
};

export default ProductList;
