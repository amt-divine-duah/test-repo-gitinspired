import '../Styles/table-footer.scss';

const TableFooter = () => {
  return (
    <div className="table-footer">
              <div className="footer-left-side">
                <p>Page 1 of 2 </p>
              </div>
              <div className="footer-right-side">
                <button >Prev</button>
                  <button>Next</button>
              </div>
            </div>
  )
}

export default TableFooter
