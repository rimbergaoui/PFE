import Navbar from "components/Navbars/AdminNavbar";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import FooterSmall from "components/Footers/FooterSmall";


export default function Notification({ contacts = [] }) {
    return (
        <>
         <Navbar  />
         <IndexNavbar fixed /> 
         <div style={{ padding: "100px" }}>
          <div class="container flex justify-center mx-auto">
           <div class="flex flex-col">
            <div class="w-full">
              <div class="border-b border-gray-200 shadow">
              <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>username</strong>
                    </th>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>email</strong>
                    </th>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>Questions</strong>
                    </th>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    ></th>
                    <th
                      class=" px-6 py-23 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    ></th>
                    <th
                      class=" px-6 py-23 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    ></th>
                    
              <a 
                 href="/home">
                    Previous
              </a>
                  </tr>
                </thead>
              {contacts.map((contact) => (
                  <tbody class="bg-white divide-y divide-gray-300">
                    <tr class="whitespace-nowrap">
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {contact.username}
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {contact.email}
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {contact.Questions}  
                      </td>
                    </tr>  
                    </tbody> 
                ))}
              </div>
              </div>
              </div>
              </div>
             </div>
             <div class="flex flex-col items-center"></div>
         <FooterSmall />
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    const res = await fetch("http://localhost:3000/api/contacts");
    const contacts = await res.json();
  
    return {
      props: {
        contacts,
      },
    };
  };
