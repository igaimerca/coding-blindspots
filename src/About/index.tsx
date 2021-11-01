import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Input, Modal, message } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Editor, EditorOptions, Language } from '../Editor';
import RestClient from '../shared/rest';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/button/style';
import 'antd/es/input/style';
import 'antd/es/modal/style';
import 'antd/es/message/style';
// @ts-ignore
import Infographic from '../assets/infographic.png';

const About = () => {
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.infographic}
          src={Infographic}
          alt="CodingBlindspots infographic"
        />
              <div> Companies rarely give feedback on coding interviews. On Interviewblindspots, post a coding question and your solution, experienced industry professionals will look at your code and provide feedback, explaining what went right and what went wrong. Improve your interview performance and increase your compensation.</div> 


<div> Built by a distrubuted team who have never met in person.  
            <ul> 
               <li><a href="https://github.com/mrraghur"> https://github.com/mrraghur/ </a> </li>
               <li><a href="https://github.com/boweihan"> https://github.com/boweihan </a></li>
               <li><a href="https://github.com/flozia"> https://github.com/flozia </a></li>
               <li><a href="https://github.com/Muhammad-Tahir-S"> https://github.com/Muhammad-Tahir-S </a></li>
            </ul> 
        If you are looking for a job, then you should go over code posted by others and study the comments on them. 
        If you are a hiring manager, please leave post some of your favourite interview questions and comments on some solutions that you really liked. 
        Tell your friends that your next great hire will come from Interviewblindspots.com !
        </div> 

        


      </div>
    </>
  );
};

export default About;
