import Label from "../ui/label";
import { FaGolang } from "react-icons/fa6";
import { FaJava } from "react-icons/fa6";
import { FaPhp } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io5";
import { SiSpringboot } from "react-icons/si";
import { SiFramework } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import { TbBrandTailwind } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { FaAngular } from "react-icons/fa6";
import { SiRedux } from "react-icons/si";
import { SiSocketdotio } from "react-icons/si";
import { SiShadcnui } from "react-icons/si";
import { SiMui } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa";
import { SiAnsible } from "react-icons/si";
import { LiaJenkins } from "react-icons/lia";
import { FaGitAlt } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { SiPortainer } from "react-icons/si";
import { SiDbeaver } from "react-icons/si";
import { DiPostgresql } from "react-icons/di";
import { SiPostman } from "react-icons/si";
import { SiBruno } from "react-icons/si";
import { SiGrafana } from "react-icons/si";
import { SiNewrelic } from "react-icons/si";
import { SiUpstash } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { FaDatabase } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";
import { MdHttp } from "react-icons/md";
import { SiApachekafka } from "react-icons/si";
import { SiRedis } from "react-icons/si";
import { SiMqtt } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiJest } from "react-icons/si";
import { SiCypress } from "react-icons/si";

export default function Skills() {
  return (
    <>
    <h2 className="text-white text-[30px] font-bold leading-tight pb-3 pt-5">Skills</h2>
          <div className="flex gap-3 p-3 flex-wrap pr-4 md:flex-row sm:flex-col">
            <div className="flex flex-col gap-3 md:w-1/3 sm:w-full">
              <div className="flex flex-col gap-3 text-bold">
                Backend
              </div>
                <div className="flex flex-row gap-3 w-full flex-wrap">
                  <Label label="Golang" icon={<FaGolang />} />  
                  <Label label="Java" icon={<FaJava />} />  
                  <Label label="PHP" icon={<FaPhp />} />
                  <Label label="Node.js" icon={<IoLogoNodejs />} />
                  <Label label="Spring Boot" icon={<SiSpringboot />} />  
                  <Label label="GoFiber" icon={<SiFramework/>} />  
                  <Label label="PHP Slim" icon={<SiFramework />} />  
                  <Label label="Express.js" icon={<SiExpress />} />  
                  <Label label="Kafka" icon={<SiApachekafka />} />  
                  <Label label="Redis" icon={<SiRedis />} />  
                  <Label label="HTTP" icon={<MdHttp />} />  
                  <Label label="GRPC" icon={<SiFramework />} />  
                  <Label label="MQTT" icon={<SiMqtt />} />  
                  <Label label="Websocket" icon={<SiSocketdotio />} />  
                </div>
            </div>
            <div className="flex flex-col gap-3 md:w-1/4 sm:w-full">
              <div className="flex flex-col gap-3 text-bold">
                Database
              </div>
                <div className="flex flex-row gap-3 w-full flex-wrap">
                  <Label label="PostgreSQL" icon={<BiLogoPostgresql />} />  
                  <Label label="MySQL" icon={<GrMysql />} />
                  <Label label="QuestDB" icon={<FaDatabase />} />  
                  <Label label="MongoDB" icon={<SiMongodb />} />  
                  <Label label="Supabase" icon={<RiSupabaseFill />} />  
              </div>
            </div>
            <div className="flex flex-col gap-3 md:w-1/3 sm:w-full">
              <div className="flex flex-col gap-3 text-bold">
                Frontend
              </div>
              <div className="flex flex-row gap-3 w-full flex-wrap">
                    <Label label="Next.js" icon={<RiNextjsFill />} />  
                    <Label label="React" icon={<FaReact />} />  
                    <Label label="JavaScript" icon={<IoLogoJavascript />} />
                    <Label label="TypeScript" icon={<BiLogoTypescript />} />  
                    <Label label="Tailwind CSS" icon={<TbBrandTailwind />} />  
                    <Label label="Angular" icon={<FaAngular />} />  
                    <Label label="Redux" icon={<SiRedux />} />  
                    <Label label="Websocket" icon={<SiSocketdotio />} />  
                    <Label label="Shadcn/ui" icon={<SiShadcnui />} />  
                    <Label label="Material UI" icon={<SiMui />} />
                    <Label label="Bootstrap" icon={<FaBootstrap />} /> 
                </div>
            </div>
            <div className="flex flex-col gap-3 md:w-1/3 sm:w-full">
              <div className="flex flex-col gap-3 text-bold">
                CI/CD
              </div>
                <div className="flex flex-row gap-3 w-full flex-wrap">
                  <Label label="Ansible" icon={<SiAnsible />} />  
                  <Label label="Jenkins" icon={<LiaJenkins />} />  
                  <Label label="Git" icon={<FaGitAlt />} />  
                  <Label label="Docker" icon={<FaDocker />} />  
                  <Label label="Vercel" icon={<IoLogoVercel />} />  
                  <Label label="Portainer" icon={<SiPortainer />} />  
              </div>
            </div>
            <div className="flex flex-col gap-3 md:w-1/3 sm:w-full">
              <div className="flex flex-col gap-3 text-bold">
                Other Tools
              </div>
                <div className="flex flex-row gap-3 w-full flex-wrap">
                  <Label label="DBeaver" icon={<SiDbeaver />} />  
                  <Label label="PgAdmin" icon={<DiPostgresql />} />  
                  <Label label="Postman" icon={<SiPostman />} />  
                  <Label label="Bruno" icon={<SiBruno />} />  
                  <Label label="Grafana" icon={<SiGrafana />} />  
                  <Label label="New Relic" icon={<SiNewrelic />} />  
                  <Label label="Upstash" icon={<SiUpstash />} /> 
                  <Label label="Cypress" icon={<SiCypress />} />  
                  <Label label="Jest" icon={<SiJest />} />  
              </div>
            </div>
          </div>
          </>
  );
}