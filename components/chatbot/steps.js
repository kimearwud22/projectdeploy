const BotRedirect = ({ url, message }) => {
	return (
	  <div>
		<a href={url} target="_blank">
		  {message}
		</a>
	  </div>
	);
  };
  
export default [ 
	{
	  id: '1',
	  message: 'What is your name?',
	  trigger: '2',
	},
	{
	  id: '2',
	  user: true,
	  trigger: '3',
	},
	{
	  id: '3',
	  message: 'Hi {previousValue}, nice to meet you!',
	  trigger: '4',
	},
	{
	  id: '4',
	  message: 'Select any service to proceed',
	  trigger: '5',
	},
	{
	  id: '5',
	  value: 'product',
	  options: [
		{ value: 'product', label: 'Product', trigger: '6' },
		{ value: 'service', label: 'Layanan', trigger: '7' },
	  ],
	},
	{
	  id: '6',
	  message: 'Select a product:',
	  trigger: '8',
	},
	{
	  id: '7',
	  message: 'Select a Layanan:',
	  trigger: '9',
	},
	{
	  id: '8',
	  options: [
		{ value: 'video', label: 'Video Production', trigger: '10' },
		{ value: 'animation', label: 'Animation', trigger: '10' },
		{ value: 'design', label: 'Design Services', trigger: '10' },
	  ],
	},
	{ 
	  id: '9',
	  options: [
		{ value: 'editing', label: 'Video Editing', trigger: '11' },
		{ value: 'promotion', label: 'Promotion Services', trigger: '11' },
		{ value: 'consulting', label: 'Consulting', trigger: '11' },
	  ],
	},
	{
	  id: '10',
	  component: (
        <BotRedirect
          message="Klik Link Berikut"
          url="<https://lucasbassetti.com.br/react-simple-chatbot/#/docs/previous-value>"
        />
      ),
	  end: true,
	},
	{
	  id: '11',
	  message: 'Oke!, Untuk Memesan Layanan {previousValue} Bisa Klik Link Berikut!',
	  component: (
        <BotRedirect
          message="Klik Link Berikut"
          url="<https://lucasbassetti.com.br/react-simple-chatbot/#/docs/previous-value>"
        />
      ),
	  end: true,
	},
];
