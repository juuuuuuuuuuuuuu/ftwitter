import { useEffect, useState } from 'react';

function Test() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(prev => prev + 1)
  }, [])

  useEffect(() => {
    setValue(prev => prev -1)
  }, [])

  useEffect(() => {
    setValue(prev => 0)
  }, [])

  useEffect(() => {
    setValue(prev => prev + 1)
  }, [])

  console.log('render', value)
  return(
    <div>promise</div>
  )
}
export default Test;