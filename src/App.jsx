
import { useState, useRef } from "react";

import './App.css'

import { IcPageHeader, IcSideNavigation, IcNavigationItem, SlottedSVG, IcFooter, IcFooterLink, IcButton, IcPopoverMenu, IcTypography, IcLink } from "@ukic/react";


function App() {

  const popoverEl = useRef(null);
  const header = useRef(null);
  const nav = useRef(null);
  const content = useRef(null);

  const handleClick = () => {
    console.log("hello");
    popoverEl.current.open = true;
  };

  const [contentSize, setContentSize] = useState(100);

  let lastScrollTop = 0;

  const onContentScroll = () => {

    console.log("scroll!!!");

    let scrollTop = window.scrollY || content.current?.scrollTop;

    console.log(lastScrollTop, scrollTop);

    
    if (scrollTop > lastScrollTop) {
      console.log("go 1  ");
    
      header.current.style.marginTop = "-100px";
      header.current.style.background = "yellow";      
      content.current.classList.remove("content");      
      content.current.classList.add("content__scroll");
    } else {
      console.log("go 2 ");      
      header.current.style.marginTop = "0px";
      header.current.style.background = "black";      
      content.current.classList.remove("content__scroll");      
      content.current.classList.add("content");
    }
    
    lastScrollTop = scrollTop;
  }

  return (
    <>

      <IcSideNavigation
        ref={nav}
        appTitle="ACME coffee shop"
        version="v0.0.7"
        status="Alpha"
        style={{ position: "fixed" }}
      >

        <IcNavigationItem slot="primary-navigation" href="#" label="Home">
          <SlottedSVG slot="app-icon" viewBox="0 0 24 24">
            <title>coffee-outline</title>
            <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
          </SlottedSVG>
          <SlottedSVG slot='icon' viewBox="0 0 24 24">
            <title>home</title>
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
          </SlottedSVG>
        </IcNavigationItem>
      </IcSideNavigation>

      <div className="headerbar" ref={header}>
        <IcPageHeader          
          heading="Latte recipe"
          sticky
          size='small'
          aligned="full-width"
        >

          <div slot="actions" >

            <IcButton
              variant="icon"              
              title="More information"
              id="button-1"
              onClick={handleClick}
            >
              <SlottedSVG
                slot="icon"
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24"                 
                viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
              </SlottedSVG>
            </IcButton>

            <IcPopoverMenu anchor="button-1" aria-label="popover" ref={popoverEl}>
              <div className="wrapper" style={{ padding: 12 }}>
                <IcTypography variant="h3">Rob C</IcTypography>
                <IcButton
                  variant="primary"
                  title="More information"
                  id="button-1"
                  onClick={handleClick}
                >
                  details
                </IcButton>

                <IcLink href="/components/link/code">Sign out</IcLink>

              </div>
            </IcPopoverMenu>
          </div>
        </IcPageHeader>

      </div>

      <div className="scrollableContent" ref={content} onScroll={onContentScroll}>

        <main>

          <button onClick={() => setContentSize(contentSize + 1)}>Add content</button>
          <button onClick={() => setContentSize(0)}>Clear content</button>

          <article>
            {Array.from(Array(contentSize)).map((item, index) => (
              <h1 key={index}>{`Hello ${index}`}</h1>
            ))}
          </article>

        </main>

        <footer>
          <IcFooter
            description="The UK Intelligence Community Design System (ICDS) is a joint project by MI6, GCHQ, MI5, and partners."
            caption="All content is available under the Open Government Licence v3.0, except source code and code examples which are available under the MIT Licence.">
            <IcFooterLink slot="link" href="/">
              Accessibility
            </IcFooterLink>
            <IcFooterLink slot="link" href="/">
              Styles
            </IcFooterLink>
            <IcFooterLink slot="link" href="/">
              Components
            </IcFooterLink>
            <IcFooterLink slot="link" href="/">
              Patterns
            </IcFooterLink>
          </IcFooter>
        </footer>

      </div>
    </>
  )
}

export default App
