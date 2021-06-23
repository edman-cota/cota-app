import React from "react";
import './skills.scss';

export const Skills = () => {
  return(
    <section className="skills section" id="skills">
      <h2 className="section__title">About Skills</h2>
      <span className="section__subtitle">My technical level</span>
      
      <div className="skills__container container grid">
        <div>

            {/* SKILL 1 */}
            <div className="skills__content skills__open">
                <div className="skills__header">
                    <i className="uil uil-brackets-curly skills__icon"></i>

                    <div>
                        <h1 className="skills__title">Frontend developer</h1>
                        <span className="skills__subtitle">More than 4 years</span>
                    </div>

                    <i class="uil uil-angle-down skills__arrow"></i>
                </div>

                <div className="skills__list grid">
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">HTML</h3>
                            <span className="skills__number">90%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__html"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">CSS</h3>
                            <span className="skills__number">80%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__css"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">JavaScript</h3>
                            <span className="skills__number">60%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__js"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">React</h3>
                            <span className="skills__number">85%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__react"></span>
                        </div>
                    </div>
                </div>
            </div>
            {/* SKILL 2 */}
            <div className="skills__content skills__close">
                <div className="skills__header">
                <i className="uil uil-server-network skills__icon"></i>

                    <div>
                        <h1 className="skills__title">Backend developer</h1>
                        <span className="skills__subtitle">More than 2 years</span>
                    </div>

                    <i class="uil uil-angle-down skills__arrow"></i>
                </div>

                <div className="skills__list grid">
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">PHP</h3>
                            <span className="skills__number">80%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__php"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">Node Js</h3>
                            <span className="skills__number">70%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__node"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">Firebase</h3>
                            <span className="skills__number">90%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__firebase"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">Python</h3>
                            <span className="skills__number">55%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__python"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
          {/* SKILL 3 */}
          <div className="skills__content skills__close">
                <div className="skills__header">
                <i className="uil uil-swatchbook skills__icon"></i>

                    <div>
                        <h1 className="skills__title">Designer</h1>
                        <span className="skills__subtitle">More than 5 years</span>
                    </div>

                    <i class="uil uil-angle-down skills__arrow"></i>
                </div>

                <div className="skills__list grid">
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">Figma</h3>
                            <span className="skills__number">90%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__figma"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">Sketch</h3>
                            <span className="skills__number">85%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__sketch"></span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__title">
                            <h3 className="skills__name">Photoshop</h3>
                            <span className="skills__number">85%</span>
                        </div>
                        <div className="skills__bar">
                            <span className="skills__percentage skills__photoshop"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
 
  );
}

export default Skills;