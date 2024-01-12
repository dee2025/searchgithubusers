import React from 'react'

function Skeleton() {
  return (
    <div>
        <div className='bg-black w-[50%] px-8 py-12 mt-16 animate-pulse'>
          <Tabs value="profile" orientation="vertical">
            <TabsHeader className="w-32">
                <Tab as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                  dfsd
                </Tab>
                <Tab as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                  dfsd
                </Tab>
                <Tab as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                  dfsd
                </Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel key={value} value={value} className="py-0">
                 
                </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
    </div>
  )
}

export default Skeleton