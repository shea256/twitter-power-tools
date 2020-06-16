import Link from 'next/link'

const serializeQuery = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const setQuery = (query, extension) => {
  return Object.assign({}, query, extension)
}

const getPageLinkNumbers = (currentPage, pageCount, numMainLinks, numMarginLinks) => {
  const linkNumbers = []
  
  if (pageCount <= numMainLinks) {
    // Special case: fewer pages than the number of page links to display
    for (let i = 1; i <= pageCount; i++) {
      linkNumbers.push(i)
    }
  } else {
    // Set the number of links on the left and right side of the main section
    let leftSide = numMainLinks / 2
    let rightSide = numMainLinks - leftSide 
    if (currentPage > pageCount - numMainLinks / 2) {
      rightSide = pageCount - currentPage
      leftSide = numMainLinks - rightSide
    } else if (currentPage < numMainLinks / 2) {
      leftSide = currentPage
      rightSide = numMainLinks - leftSide
    }
  
    for (let i = 1; i <= pageCount; i++) {
      // Add a left margin link
      if (i <= numMarginLinks) {
        linkNumbers.push(i)
      }
      // Add a right margin link
      else if (i > pageCount - numMarginLinks) {
        linkNumbers.push(i)
      }
      // Add a main section link
      else if (i >= currentPage - leftSide && i <= currentPage + rightSide) {
        linkNumbers.push(i)
      }
      // Add a link break / ellipsis
      else if (linkNumbers[linkNumbers.length - 1] !== null) {
        linkNumbers.push(null)
      }
    }
  }
  
  return linkNumbers
}

const buildPageLinks = (pageLinkNumbers, currentPage, linkHref, linkAs, query, pageCount) => {
  const pageLinks = []

  // Set the "previous" page link
  const previousPageQueryString = serializeQuery(setQuery(query, {page: currentPage-1}))
  let previousPageLink = {
    title: '<',
    href: `${linkHref}?${previousPageQueryString}`,
    className: 'btn btn-outline-secondary btn-arrowed'
  }
  if (currentPage <= 1) {
    previousPageLink.disabled = true
    previousPageLink.className = `${previousPageLink.className} disabled`
  }
  if (linkAs) {
    previousPageLink.as = `${linkAs}?${previousPageQueryString}`
  }
  pageLinks.push(previousPageLink)

  // Set the numbered page link
  pageLinkNumbers.map(pageLinkNumber => {
    const queryString = serializeQuery(setQuery(query, {page: pageLinkNumber}))
    let className = 'btn btn-numbered btn-outline-secondary'
    if (pageLinkNumber === null) {
      pageLinks.push({
        title: '...',
        href: ``,
        className: `${className} disabled`,
        disabled: true
      })
    } else {
      if (currentPage === pageLinkNumber) {
        className = 'btn btn-numbered btn-primary'
      }
      let pageLink = {
        title: `${pageLinkNumber}`,
        href: `${linkHref}?${queryString}`,
        className: className
      }
      if (linkAs) {
        pageLink.as = `${linkAs}?${queryString}`
      }
      pageLinks.push(pageLink)
    }
  })

  // Set the "next" page link
  const nextPageQueryString = serializeQuery(setQuery(query, {page: currentPage+1}))
  let nextPageLink = {
    title: '>',
    href: `${linkHref}?${nextPageQueryString}`,
    className: 'btn btn-outline-secondary btn-arrowed'
  }
  if (currentPage === pageCount) {
    nextPageLink.disabled = true
    nextPageLink.className = `${nextPageLink.className} disabled`
  }
  if (linkAs) {
    nextPageLink.as = `${linkAs}?${nextPageQueryString}`
  }
  pageLinks.push(nextPageLink)

  return pageLinks
}

const PaginationLinks = ({
  currentPage, pageCount, linkHref, linkAs, query, numMainLinks, numMarginLinks
}) => {
  if (!numMainLinks) numMainLinks = 3
  if (!numMarginLinks) numMarginLinks = 1
  const pageLinkNumbers = getPageLinkNumbers(currentPage, pageCount, numMainLinks, numMarginLinks)
  const pageLinks = buildPageLinks(pageLinkNumbers, currentPage, linkHref, linkAs, query, pageCount)

  return (
    <div style={{ margin: '25px 0px' }}>

      <div className="btn-group">
        {pageLinks.map((link, index) => {
          if (link.disabled === true) {
            return (
              <a className={link.className} key={index}>
                {link.title}
              </a>
            )
          } else if (link.as) {
            return (
              <Link href={link.href} as={link.as} key={index}>
                <a className={link.className}>
                  {link.title}
                </a>
              </Link>
            )
          } else {
            return (
              <Link href={link.href} key={index}>
                <a className={link.className}>
                  {link.title}
                </a>
              </Link>
            )
          }
        })}
      </div>

      <style jsx>{`
        a[disabled] {
          pointer-events: none;
          cursor: default;
        }
        .btn.disabled, .btn:disabled {
          opacity: .65;
        }
        .btn {
          display: inline-block;
          font-weight: 400;
          color: #212529;
          text-align: center;
          vertical-align: middle;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-color: transparent;
          border: 1px solid transparent;
          padding: .375rem .75rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: .25rem;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        .btn-group, .btn-group-vertical {
          position: relative;
          display: -ms-inline-flexbox;
          display: inline-flex;
          vertical-align: middle;
        }
        .btn-group>.btn-group:not(:last-child)>.btn, .btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .btn-group-vertical>.btn, .btn-group>.btn {
          position: relative;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
        }
        .btn-group>.btn-group:not(:first-child), .btn-group>.btn:not(:first-child) {
          margin-left: -1px;
        }
        .btn-group>.btn-group:not(:first-child)>.btn, .btn-group>.btn:not(:first-child) {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .btn-group-vertical>.btn, .btn-group>.btn {
          position: relative;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
        }
        .btn-primary {
          color: #fff;
          background-color: #007bff;
          border-color: #007bff;
        }
        .btn-secondary {
          color: #fff;
          background-color: #6c757d;
          border-color: #6c757d;
        }
        .btn-outline-primary {
          color: #007bff;
          border-color: #007bff;
        }
        .btn-outline-secondary {
          color: #6c757d;
          border-color: #6c757d;
        }
      `}</style>
    </div>
  )
}

export default PaginationLinks