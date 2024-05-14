// Type definitions for ChemDoodle Web Components 10.0.0
// Project: https://web.chemdoodle.com
// Definitions by: Ádám Baróthi <https://github.com/adam-of-barot>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Based off of the offical API docs: https://web.chemdoodle.com/docs/api

import type { mat4, vec3 } from "gl-matrix";

/**
 * this package is the root for all contents of the ChemDoodle Web Components library.
 * It contains access to all packages, canvases and layouts as well as shortcut functions for common tasks.
 */
declare module ChemDoodle {
    /** a hashmap for elemental data where the element's symbol is the key and the corresponding Element data structure is the value */
    const ELEMENT: Object

    /** a hashmap for residue data where the residue's symbol is the key and the corresponding Residue data structure is the value */
    const RESIDUE: Object

    /** a numbered Array containing all element symbols, where the index is the element's atomic number - 1 (index starts at 0 for hydrogen) */
    const SYMBOLS: Object

    /** returns the version of the ChemDoodle Web Components library; changing this value in source is not recommended */
    function getVersion(): string

    /** 
     * shortcut method to read a CIF file and return the corresponding Molecule and unit cell shape without instantiating a CIFInterpreter;
     * the returned object will contain two parameters, molecule and unitCell;
     * the three optional integers specify the supercell dimensions, by default they are all 1, so reading a file without specifying these parameters will produce just the unit cell.
     * In addition to reading atoms from CIF files, this interpreter will also produce a unit cell and other objects relevant to the display of periodic information
     */
    function readCIF(content: string, xSuper?: number, ySuper?: number, zSuper?: number): Object

    /** shortcut method to read CML and return the corresponding reaction data without instantiating an CMLInterpreter */
    function readCML(): Object

    /** 
     * shortcut method to read a IUPAC JCAMP-DX file and return the corresponding Spectrum without instantiating a JCAMPInterpreter;
     * this shortcut method will automatically convert HZ to PPM
     */
    function readJCAMP(content: string): structures.Spectrum

    /** 
     * shortcut method to read ChemDoodle JSON from a string and return an object with two parameters, molecules and shapes, without instantiating a JSONInterpreter;
     * this function will automatically handle the type of JSON object received
     */
    function readJSON(content: string): structures.Molecule

    /**
     * shortcut method to read a MDL MOLFile and return the corresponding Molecule without instantiating a MOLInterpreter;
     * this function supports both v2000 and v3000 MOLFiles;
     * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Ängstroms
     */
    function readMOL(content: string, multiplier?: number): structures.Molecule

    /**
     * shortcut method to read a RCSB PDB file and return the corresponding Molecule without instantiating a PDBInterpreter;
     * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Ängstroms.
     * In addition to reading atoms from PDB files, this interpreter will also read residue data and generate ribbons and cartoons for that data
     */
    function readPDB(content: string, multiplier?: number): structures.Molecule

    /**
     * shortcut method to read a MDL RXNFile and return the corresponding reaction data without instantiating an RXNInterpreter;
     * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Ängstroms
     */
    function readRXN(content: string, multiplier?: number): { molecules: structures.Molecule[]; shapes: structures.d3.Shape[] }

    /** shortcut method to read a XYZ file and return the corresponding Molecule without instantiating a XYZInterpreter */
    function readXYZ(content: string): structures.Molecule

    /** shortcut method to write an CML File given an input Molecule array without instantiating an CMLInterpreter */
    function writeCML(molecules: structures.Molecule[]): string

    /** shortcut method to write ChemDoodle JSON into a string given input Molecule and Shape arrays without instantiating a JSONInterpreter */
    function writeJSON(mols: structures.Molecule[], shapes: structures.d3.Shape[]): string

    /** shortcut method to write a V2000 MDL MOLFile given an input Molecule without instantiating a MOLInterpreter */
    function writeMOL(mol: structures.Molecule): string

    /** shortcut method to write a V3000 MDL MOLFile given an input Molecule without instantiating a MOLInterpreter */
    function writeMOLV3(mol: structures.Molecule): string

    /** shortcut method to write an MDL RXNFile given an input Molecule array and Shape array without instantiating an RXNInterpreter */
    function writeRXN(molecules: structures.Molecule[], shapes: structures.d3.Shape[]): string

    interface _Canvas {
        /**
         * additional function that is called after content is loaded into the Canvas;
         * is called in the loadMolecule and loadContent functions
         */
        afterLoadContent?(): void

        /**
         * set up some internal variables, usually for shapes before drawing in the uis interfaces;
         * force determines whether the check happens now or later
         */
        checksOnAction?(force: boolean): void

        /** draws extra graphics on top of the base graphics, override this for your custom canvases */
        drawChildExtras?(ctx: CanvasRenderingContext2D, styles?: structures.Styles): void

        /** additional function to be called during create(), such that child classes can do additional setup before returning to the child constructor */
        subCreate?(): void


        // Mobile Touch Events and Gestures

        /**
         * receives the double tap event for mobile devices, override this for your custom canvases,
         * forwards to dblclick if not implemented,
         * if neither dbltap or dblclick are implemented,
         * then the event is forwarded to touchstart or mousedown
         */
        dbltap?(e: JQuery.Event): void

        /** receives the gesture move event for mobile devices, override this for your custom canvases */
        gesturechange?(e: JQuery.Event): void

        /** receives the touch end event for mobile devices, override this for your custom canvases */
        gestureend?(e: JQuery.Event): void

        /** receives the gesture start event for mobile devices, override this for your custom canvases */
        gesturestart?(e: JQuery.Event): void

        /** 
         * receives an event for mobile devices where multiple fingers are moving on the screen, override this for your custom canvases,
         * the center of the fingers is provided in the Event, the number of fingers touching the screen is also sent to the handler
         */
        multitouchmove?(e: JQuery.Event, numFingers: number): void

        /** receives the tap event for mobile devices (quickly touchstart then touchend), override this for your custom canvases, forwards to click if not implemented */
        tap?(e: JQuery.Event): void

        /** receives the touch end event for mobile devices, override this for your custom canvases, forwards to mouseup if not implemented */
        touchend?(e: JQuery.Event): void

        /** receives the touch hold event for mobile devices, override this for your custom canvases; will fire if the user touches down and does not lift or move for 1 second */
        touchhold?(e: JQuery.Event): void

        /** receives the touch move event for mobile devices, override this for your custom canvases, forwards to drag if not implemented */
        touchmove?(e: JQuery.Event): void

        /** receives the touch start event for mobile devices, override this for your custom canvases, forwards to mousedown if not implemented */
        touchstart?(e: JQuery.Event): void


        // Mouse Events

        /** receives the mouse click event, override this for your custom canvases */
        click?(e: JQuery.Event): void

        /** receives the contextmenu event, responding to the right mouse button being pressed down to open the context menu */
        contextmenu?(e: JQuery.Event, delta: number): void

        /** receives the mouse double click event, override this for your custom canvases */
        dblclick?(e: JQuery.Event): void

        /** receives the mouse drag event, override this for your custom canvases */
        drag?(e: JQuery.Event): void

        /** receives the mouse middle click event, override this for your custom canvases */
        middleclick?(e: JQuery.Event): void

        /** receives the mouse middle mouse down event, override this for your custom canvases */
        middlemousedown?(e: JQuery.Event): void

        /** receives the mouse middle mouse up event, override this for your custom canvases */
        middlemouseup?(e: JQuery.Event): void

        /** receives the mouse down event, override this for your custom canvases */
        mousedown?(e: JQuery.Event): void

        /** receives the mouse move event, override this for your custom canvases */
        mousemove?(e: JQuery.Event): void

        /** receives the mouse out event, override this for your custom canvases */
        mouseout?(e: JQuery.Event): void

        /** receives the mouse over event, override this for your custom canvases */
        mouseover?(e: JQuery.Event): void

        /** receives the mouse up event, override this for your custom canvases */
        mouseup?(e: JQuery.Event): void

        /** receives the mouse wheel event, override this for your custom canvases; delta is the amount the wheel has spun */
        mousewheel?(e: JQuery.Event, delta: number): void

        /** receives the mouse right click event, override this for your custom canvases */
        rightclick?(e: JQuery.Event): void

        /** receives the mouse right mouse down event, override this for your custom canvases */
        rightmousedown?(e: JQuery.Event): void

        /** receives the mouse right mouse up event, override this for your custom canvases */
        rightmouseup?(e: JQuery.Event): void


        //Keyboard Events

        /** receives the key down event, override this for your custom canvases */
        keydown?(e: JQuery.Event): void

        /** receives the key press event, override this for your custom canvases */
        keypress?(e: JQuery.Event): void

        /** receives the key up event, override this for your custom canvases */
        keyup?(e: JQuery.Event): void
    }

    /**
     * is the parent class for all ChemDoodle Web Component Canvases, it should not be instantiated.
     * Its basic functionality allows for molecules to be drawn and loaded.
     * This class also hosts the system for handling user input events from the mouse and the keyboard.
     * This class should be extended for custom canvases.
     */
    abstract class _Canvas {
        constructor()

        /** the HTML id of the associated HTML element */
        id: string
        /** the width the associated HTML element */
        width: number
        /** the height of the associated HTML element */
        height: number
        /** the visual specifications that define how content should be painted */
        styles: structures.Styles
        /** an array of Molecule data structures that the Canvas renders */
        molecules: structures.Molecule[]
        /** an array of Shape data structures that the Canvas renders */
        shapes: structures.d3.Shape[]
        /** 
         * the message to be displayed if there is no content currently present for the canvas to render.
         * If this variable is undefined, no message is displayed if there is no content
         */
        emptyMessage: string
        /** 
         * the background image, overrides the VisualSpecification backgroundColor property;
         * if undefined, no image is drawn
         */
        image: ImageData
        /** 
         * all default browser event actions (like scrolling, text input) are blocked when performed above the Canvas,
         * set this variable to true to disable this, as is done when the sketcher needs text input
         */
        doEventDefault: boolean
        toolbarManager: uis.gui.desktop.ToolbarManager

        /**
         * loads the given Molecule, mol, and checks it;
         * the current content of the canvas is not cleared, the input mol is pushed as the next element of the molecules array;
         * repaints canvas
         */
        addMolecule(mol: structures.Molecule): void

        /**
         * loads the given Shape, shape; the current content of the canvas is not cleared, the input shape is pushed as the next element of the shapes array;
         * repaints canvas
         */
        addShape(shape: structures.d2._Shape): void

        /** returns true if a bond exists in one of the Canvas's molecules that contains the two parameter atoms */
        bondExists(a1: structures.Atom, a2: structures.Atom): boolean

        /** centers the loaded content in the canvas */
        center(): void

        /** 
         * clears the canvas by emptying the molecules and shapes arrays and then repaints;
         * resets the scale back to 1
         */
        clear(): void

        /** 
         * this function places the canvas in the HTML page and is called in every constructor of the children classes.
         * The id is the HTML id of the canvas element, with width and height its dimensions
         */
        create(id: string, width: number, height: number): void

        /** returns an Array containing all of the atoms of the molecules contained within the canvas */
        getAllAtoms(): structures.Atom[]

        /** returns an Array containing all of the bonds of the molecules contained within the canvas */
        getAllBonds(): structures.Bond[]

        /** returns an Array containing all of the Atoms of the molecules and Points of the shapes contained within the canvas */
        getAllPoints(): (structures.Atom | structures.Point)[]

        /**
         * returns the bond present in the Canvas's molecules that contains the two parameter atoms;
         * if such a bond does not exist, undefined is returned
         */
        getBond(a1: structures.Atom, a2: structures.Atom): structures.Bond | undefined

        /** returns a Bounds object containing the 2D bounds of all of the graphics in the Canvas */
        getContentBounds(): math.Bounds

        /** returns the first Molecule element in the molecules array currently associated with the canvas */
        getMolecule(): structures.Molecule

        /**
         * returns the Molecule in the Canvas's molecules array that contains the parameter atom;
         * if such a molecule does not exist, undefined is returned
         */
        getMoleculesByAtom(a: structures.Atom): structures.Molecule | undefined

        /** returns the Canvas's array of Molecule objects */
        getMolecules(): structures.Molecule[]

        /**
         * loads the given Molecules and Shapes in the provided mols and shapes Arrays;
         * the current content of the canvas is cleared, the input arrays become the new molecules and shapes Arrays;
         * checks molecules and repaints canvas
         */
        loadContent(mols: structures.Molecule[], shapes: structures.d3.Shape[]): void

        /**
         * loads the given Molecule, mol, and checks it;
         * the current content of the canvas is cleared, the input mol is placed as the first element of the molecules array;
         * repaints canvas
         */
        loadMolecule(mol: structures.Molecule): void

        /** conditions the user input event and sets a new variable in the Event object named p that contains the coordinates of the event in the canvas */
        prehandleEvent(e: JQuery.Event): void

        /**
         * removes the given Molecule, mol from the molecules array;
         * repaints canvas
         */
        removeMolecule(mol: structures.Molecule): void

        /**
         * removes the given Shape, shape from the shapes array;
         * repaints canvas
         */
        removeShape(shape: structures.d2._Shape): void

        /** repaints the canvas */
        repaint(): void

        /**
         * resizes the canvas to the input width and height parameters, this is done efficiently and is the prefered way to resize Canvas objects;
         * this function will automatically recenter content and perform the necessary functions to update rendering
         */
        resize(width: number, height: number): void

        /** sets the background image to the image specified by the url parameter */
        setBackgroundImage(): void
    }

    /** is a child of the Canvas class and provides a basic canvas for simply displaying a static styled structural drawing */
    class ViewerCanvas extends _Canvas {
        constructor(id: string, width: number, height: number)
    }

    /** is a child of the Canvas class and provides a basic button-like canvas: it responds to mouse overs and executes a link or action when clicked on */
    class HyperlinkCanvas extends _Canvas {
        constructor(id: string, width: number, height: number, urlOrFunction: string)

        /** this is the url to be directed to when clicked, this can also be a function object and the function will be executed when clicked */
        urlOrFuntion: string
        /** the color of the mouse over highlight */
        color: string
        /** the width of the mouse over highlight */
        size: number
        /** if true and urlOrFunction is a url, then the url will be opened in a new window instead of changing the current page */
        openInNewWindow: boolean
        /** if this is initialized, then the mouse over will display an image instead of a hyperlink-like decoration */
        hoverImage: ImageData
        /** keeps track of the last event */
        e: JQuery.Event

        /** sets the canvas's hover image to the image url specified */
        setHoverImage(url: string): void

        /** performs the mouse click action */
        click(e: JQuery.Event): void

        /** draws extra graphics on top of the base graphics */
        drawChildExtras(ctx: CanvasRenderingContext2D): void

        /**  performs the mouse out action */
        mouseout(e: JQuery.Event): void

        /** performs the mouse over action, currently not called */
        mouseover(e: JQuery.Event): void
    }

    /** is a child of the Canvas class and provides a basic canvas for users to transform (translate [alt+drag], rotate [drag], scale [mousewheel]) molecules with */
    class TransformCanvas extends _Canvas {
        constructor(id: string, width: number, height: number)

        /** keeps track of the last mouse position */
        lastPoint: structures.Point
        /** will rotate in 3 dimensions if true, will only rotate around the z axis if false */
        rotate3D: boolean
        /** multiplication modifier for the rotation calculations, larger numbers correspond to faster rotations */
        rotationMultMod: number
        /** keeps track of the last pinch scale from a mobile gesture */
        lastPinchScale: number
        /** keeps track of the last rotation magnitude from a mobile gesture */
        lastGestureRotate: number

        /** performs the double-click action, which centers the molecule */
        dblclick(e: JQuery.Event): void

        /** performs the mouse drag action */
        drag(e: JQuery.Event): void

        /** handles any pinch and rotate gestures from mobile devices which will scale and rotate the molecule */
        gesturechange(e: JQuery.Event): void

        /** resets the gesture tracking variables and ends the gesture */
        gestureend(e: JQuery.Event): void

        /** performs the mouse down action */
        mousedown(e: JQuery.Event): void

        /** performs the mouse wheel action */
        mousewheel(e: JQuery.Event, delta: number): void;
    }

    /** is a child of the Canvas class and provides a basic canvas for users to search databases with. */
    class MolGrabberCanvas extends _Canvas {
        constructor(id: string, width: number, height: number)

        /** generates the HTML for the database drop down and submit buttons */
        getInputFields?(): void

        /** uses iChemLabs cloud services to contact the database with query term as defined in the form and then updates the Canvas after receiving the molecule data */
        search?(): void

        /** automatically searches for and loads the input search term */
        setSearchTerm?(term: string): void
    }

    /**
     * is a child of the Canvas class and provides a basic canvas for users to load molecule from their computer with.
     * The action is the server side script to be called that loads the file into a hidden frame.
     * After the asynchronous call is finished, the correct function is called to load the molecule into the canvas with the associated id
     */
    class FileCanvas extends _Canvas {
        constructor(id: string, width: number, height: number, string: string, urlOrFunction: string, color: string, size: string)
    }

    /**
     * is a child of the Canvas class and is the parent class for all animated ChemDoodle Web Component Canvases, it should not be instantiated.
     * It provides an extendable framework for creating animations.
     * This class should be extended for custom animated canvases.
     */
    abstract class _AnimatorCanvas extends _Canvas {
        constructor()

        /** a handle on the current Timer so it can be started and stopped */
        handle: TimerHandler
        /** the default refresh rate */
        timeout: number
        /** keeps track of the last time the nextFrame() function was called */
        lastTime: number

        /** returns true if the animation is currently running */
        isRunning(): boolean

        /** initializes the animation */
        startAnimation(): void

        /** terminates the animation */
        stopAnimation(): void

        /**
         * called by the timer, in the frequency specified by the interval timeout,
         * this must be overridden for your custom canvases, repaints the canvas after each call;
         * this class keeps track of the time between calls and passes that value to this function for accurate animations
         */
        abstract nextFrame(delta: number): void
    }

    /** is a child of the AnimatorCanvas class and provides a basic canvas for displaying molecular rotation animations */
    class RotatorCanvas extends _AnimatorCanvas {
        constructor(id: string, width: number, height: number, string: string, rotate3D: boolean)

        /** the animation will rotate in 3 dimensions if true, will only rotate around the z axis if false */
        rotate3D: boolean
        /** the x rotation increment */
        xIncrement: number
        /** the y rotation increment */
        yIncrement: number
        /** the z rotation increment */
        zIncrement: number

        /** catches double click events and toggles the animation */
        dblclick(e: JQuery.Event): void

        /** updates the state during the rotation animation */
        nextFrame(delta: number): void
    }

    /** is a child of the AnimatorCanvas class and provides a basic canvas for displaying transitions between several molecular structures */
    class SlideshowCanvas extends _AnimatorCanvas {
        constructor(id: string, width: number, height: number)

        /** the molecular structures to be displayed in the order they are to be displayed in, this should not be empty */
        molecules: structures.Molecule[]
        /** keeps track of the current index in molecules */
        curIndex: number
        /** this parameter is inherited from AnimatorCanvas, but it is set to a larger value */
        timeout: number
        /** keeps track of the current alpha during the transition */
        alpha: number
        /** holds on to the second inner Timer for performing the transition, so it can be started and stopped */
        innerHandle: TimerHandler
        /** keeps track of the current phase (different types of animations) during the transition */
        phase: number

        /** adds a molecule to the slideshow */
        addMolecule(molecule: structures.Molecule): void

        /** completes the second phase of the animation and the molecule switch */
        breakInnerHandle(): void

        /** draws extra graphics on top of the base graphics */
        drawChildExtras(ctx: CanvasRenderingContext2D): void

        /** updates the state during the rotation */
        nextFrame(delta: number): void;
    }

    /**
     * is the parent class for all 3D ChemDoodle Web Component Canvases, it should not be instantiated.
     * Its basic functionality allows for molecules to be rendered in a 3D scene and loaded.
     * This class should be extended for custom 3D canvases.
     */
    abstract class _Canvas3D extends _Canvas {
        constructor()

        /**
         * by default, the webgl context will not preserve the drawing buffer, leading to performance improvements;
         * however you may wish to set this to true to preserve the buffer if you wish to use the ChemDoodle.io.png class to output the Canvas3D to PNG;
         * once a Canvas3D is created, the context will have this value bound and the context cannot be changed after initialization (you will need to create a new Canvas3D with the different value)
         */
        static PRESERVE_DRAWING_BUFFER: string
        /** the rotation matrix to be applied before rendering the 3D scene */
        rotationMatrix: mat4
        /** the translation (actually the negative of the center of the scene content) to be applied before rendering the 3D scene */
        contentCenter: Array<number>
        /** the last point in the canvas's space that the user initiated a mouseDown event */
        lastPoint: structures.Point
        /** overridden to 'WebGL is Unavailable!', to be displayed by default if the WebGL context creation fails */
        emptyMessage: string
        /** keeps track of the pinch scale for mobile gestures */
        lastPinchScale: number
        /** keeps track of the gesture rotate value for mobile gestures */
        lastGestureRotate: number

        /** pipeline for deferred rendering */
        deferredRender(): void

        /** controls what the Canvas3D displays if WebGL is unavailable */
        displayMessage(): void

        /** pipeline for immediate rendering */
        forwardRender(): void

        /** returns true if the 3D context is capable of supporting deferred rendering */
        isSupportDeferred(): boolean

        /**
         * returns the atom or bond that is located in the 3D scene, closest to the camera, at the <canvas> coordinates of the input x and y values;
         * if no object is at those coordinates, undefined is returned;
         * includeAtoms and includeBonds define whether those objects are selectable
         * (if you make both true and you are only looking to select atoms,bonds will get in the way of selecting atoms)
         */
        pick(x: number, y: number, includeAtoms: boolean, includeBonds: boolean): structures.Atom | structures.Bond | undefined

        /** deferred rendering color pass */
        renderColor(): void

        /** renders the scene to the shadow FBO */
        renderDepthMap(): void

        /** helper method for rendering decorative components of the scene */
        renderExtras(): void

        /** deferred rendering normal pass */
        renderNormal(): void

        /** deferred rendering Outline pass */
        renderOutline(): void

        /** deferred rendering position pass */
        renderPosition(): void

        /** deferred rendering SSAO pass */
        renderSSAO(): void

        /** helper method for rendering text */
        renderText(text: string, position: Array<number>): void

        /** creates the 3D scene */
        setupScene(): void

        /** updates the projection for the scene without other overhead */
        updateScene(): void

        /** helper method to reset the scene if a gl parameter has been altered */
        afterLoadContent(): void

        /** centers the molecule in 3D around the origin */
        center(): void

        /** performs the mouse drag action */
        drag(e: JQuery.Event): void

        /** performs the gesturechange action */
        gesturechange(e: JQuery.Event): void

        /** performs the mouse down action */
        mousedown(e: JQuery.Event): void

        /** performs the mouse up action */
        mousedown(e: JQuery.Event): void

        /** performs the mouse scroll action */
        mousewheel(e: JQuery.Event): void

        /** performs the multitouchmove action */
        multitouchmove(e: JQuery.Event): void

        /** renders the 3D scene */
        repaint(): void

        /** performs the mouse right click action */
        rightmousedown(e: JQuery.Event): void

        /**
         * sets up WebGLRenderingContext, alerts viewer to warning if WebGLRenderingContext cannot be created;
         * initializes shaders and scene
         */
        subCreate(): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for simply displaying a static 3D scene of a molecule */
    class ViewerCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** set to undefined to ignore this gesture */
        drag(): void

        /** set to undefined to ignore this gesture */
        mousedown(): void

        /** set to undefined to ignore this gesture */
        mousewheel(): void

        /** set to undefined to ignore this gesture */
        rightmousedown(): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for users to transform (translate [alt+drag], rotate [drag], scale [mousewheel]) molecules with in a 3D scene */
    class TransformCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)
    }

    /**
     * is a child of the Canvas3D class and provides a basic 3D canvas for users to search databases with.
     * The content may then be transformed just as in the Transformer3D canvas.
     */
    class MolGrabberCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** uses iChemLabs cloud services to contact the database with query term as defined in the form and then updates the Canvas3D after receiving the molecule data */
        search(): void

        /** automatically searches for and loads the input search term */
        setSearchTerm(term: string): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for displaying molecular rotation animations in a 3D scene, also doubly inherits methods from the AnimatorCanvas class */
    class RotatorCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** a handle on the current Timer so it can be started and stopped */
        handle: TimerHandler
        /** the default refresh rate */
        timeout: number
        /** the x rotation increment */
        xIncrement: number
        /** the y rotation increment */
        yIncrement: number
        /** the z rotation increment */
        zIncrement: number

        /** returns true if the animation is currently running */
        isRunning(): boolean

        /** initializes the animation */
        startAnimation(): void

        /** terminates the animation */
        stopAnimation(): void

        /** catches double click events and toggles the animation */
        dblclick(e: JQuery.Event): void

        /** set to undefined to ignore this gesture */
        drag(): void

        /** set to undefined to ignore this gesture */
        mousedown(): void

        /** set to undefined to ignore this gesture */
        mousewheel(): void

        /** updates the state during the rotation animation */
        nextFrame(delta: number): void

        /** set to undefined to ignore this gesture */
        rightmousedown(): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for displaying movies of molecules in a 3D scene, also doubly inherits methods from the AnimatorCanvas class */
    class MovieCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** specifies that movie will play once to the end and stop */
        static PLAY_ONCE: number
        /** specifies that movie will play continuously, restarting from the first frame once it reaches the end */
        static PLAY_LOOP: number
        /** specifies that movie will play continuously, springing back and forth between the first and last frames */
        static PLAY_SPRING: number
        /**
         * an array containing molecules and shapes, with each entry representing a frame to be displayed in the order they are to be displayed in, this should not be empty;
         * you should fill this array before the _Canvas.loadMolecule() function is called so all the data is properly setup
         */
        frames: (structures.Molecule | structures.d3.Shape)[]
        /** a handle on the current Timer so it can be started and stopped */
        handle: TimerHandler
        /** the default refresh rate */
        timeout: number
        /** set to specify how the movie playback will proceed */
        playMode: number
        /** used internally to allow the spring playback method to function */
        reverse: boolean
        /** keeps track of the next frame number */
        frameNumber: number

        /** takes an array of molecules and shapes and adds them to the end of the frame array. */
        addFrame(mols: structures.Molecule[], shapes: structures.d3.Shape[]): void

        /** returns true if the animation is currently running */
        isRunning(): boolean

        /** initializes the animation */
        startAnimation(): void

        /** terminates the animation */
        stopAnimation(): void

        /** centers all of the frames in the molecules array */
        center(): void

        /** catches double click events and toggles the animation */
        dblclick(e: JQuery.Event): void

        /** updates the state during the rotation animation */
        nextFrame(delta: number): void
    }

    /**
     * is a child of the Canvas class and is the parent class for all Spectrum ChemDoodle Web Component Canvases, it should not be instantiated.
     * This canvas is specifically suited for displaying graphics of spectra.
     */
    abstract class _SpectrumCanvas extends _Canvas {
        constructor()

        /** the Spectrum data structure that this Canvas displays */
        spectrum: structures.Spectrum

        /** returns the Spectrum belonging to this SpectrumCanvas */
        getSpectrum(): structures.Spectrum

        /** loads the spectrum and then repaints */
        loadSpectrum(): void

        /** paints the spectrum */
        repaint(): void
    }

    /** is a child of the SpectrumCanvas class and provides a basic canvas for simply displaying a static styled spectrum drawing */
    class ObserverCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number)
    }

    /** is a child of the SpectrumCanvas class and provides an basic canvas for viewing several spectra superimposed over each other */
    class OverlayCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number)

        /** the additional spectra to be overlaid on the main spectrum */
        overlaySpectra: structures.Spectrum[]

        /**
         * adds a spectrum to the canvas;
         * it is recommended that this function is used over directly populating the overlaySpectra array, as this function will first set the main spectrum if it isn't set
         */
        addSpectrum(spectrum: structures.Spectrum): void

        /** draws extra graphics on top of the base graphics */
        innerRepaint(ctx: CanvasRenderingContext2D): void
    }

    /** is a child of the SpectrumCanvas class and provides an interactive canvas for zooming in on peaks in spectra */
    class PerspectiveCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number)

        /** keeps track of the x-coordinates for the start and end of the drag event */
        dragRange: structures.Point
        /** determines whether the y-axis will rescale upon a zoom */
        rescaleYAxisOnZoom: boolean
        /** keeps track of the last pinch scale from a mobile gesture */
        lastPinchScale: number

        /** performs the double-click action, which fits the entire spectrum to the canvas */
        dblclick(e: JQuery.Event): void

        /** performs the mouse drag action, which will zoom in on the spectrum; if the shift key is held, then the spectrum will be translated */
        drag(e: JQuery.Event): void

        /** draws extra graphics on top of the base graphics */
        drawChildExtras(ctx: CanvasRenderingContext2D): void

        /** handles any pinch gestures from mobile devices which will scale the spectrum */
        gesturechange(e: JQuery.Event): void

        /** performs the mouse down action */
        mousedown(e: JQuery.Event): void

        /** performs the mouse up action */
        mouseup(e: JQuery.Event): void

        /** performs the mouse wheel action */
        mousewheel(e: JQuery.Event, delta: number): void
    }

    /** is a child of the SpectrumCanvas class and provides an interactive canvas for viewing internal coordinates in spectra */
    class SeekerCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number, seekType: string)

        /** seeks the pointer location */
        static SEEK_POINTER: string
        /** seeks closest plot coordinate by the x coordinate of the pointer location */
        static SEEK_PLOT: string
        /** seeks closest peak coordinate by the x coordinate of the pointer location */
        static SEEK_PEAK: string
        /** seek method for the canvas, must be one of the SEEK constants */
        seekType: string
        /** keeps track of the last point from the user */
        p: structures.Point

        /** draws extra graphics on top of the base graphics */
        innerRepaint(ctx: CanvasRenderingContext2D): void

        /** performs the mouse move action */
        mousemove(e: JQuery.Event): void

        /** performs the mouse out action */
        mouseout(e: JQuery.Event): void

        /** performs the touch end action */
        touchend(e: JQuery.Event): void

        /** performs the touch move action */
        touchmove(e: JQuery.Event): void

        /** performs the touch start action */
        touchstart(e: JQuery.Event): void
    }

    /**
     * is a child of the Canvas class and displays a periodic table of elements.
     * As with all components, it is completely customizable and interactive.
     */
    class PeriodicTableCanvas extends _Canvas {
        constructor(id: string, cellDimension: number)

        /** the padding between the sides of the component and the table */
        padding: number
        /** the width and height of each cell in the periodic table, 20 by default, but also specified in the constructor */
        cellDimension: number
        /** the currently hovered cell, or undefined if there is no cell hovered */
        hovered: structures.PeriodicCell | undefined
        /** the currently selected cell, or undefined if there is no cell selected */
        selected: structures.PeriodicCell | undefined

        /** draws the provided cell to the canvas that owns the Context using the given Styles, override this function to change the rendering of the table */
        drawCell(ctx: CanvasRenderingContext2D, styles: structures.Styles, cell: structures.PeriodicCell): void

        /** returns the Element object corresponding to the cell that is currently hovered by the mouse pointer, and returns undefined if no cell is hovered */
        getHoveredElement(): structures.Element | undefined

        /** catches double click events and selects a cell */
        click(e: JQuery.Event): void

        /** set to undefined to ignore this function from the _Canvas class */
        getMolecule(): structures.Molecule

        /** catches mouse move events and hovers a cell */
        mousemove(e: JQuery.Event): void

        /** catches mouse out events and sets the hovered cell to undefined */
        mouseout(e: JQuery.Event): void

        /** paints the periodic table */
        repaint(): void

        /** set to undefined to ignore this function from the _Canvas class */
        setMolecule(): void

        /** sets up the table and all the table cells, this function is called by the constructor, but can be called after changing the constructor defaults to re-layout the table */
        setupTable(): void

        /** catches the touchstart mobile event and hovers a cell */
        touchstart(e: JQuery.Event): void
    }

    /**
     * is a child of the Canvas class and provides a full sketcher for drawing chemical data, modeled off of the popular ChemDoodle 2D application.
     * This class is not avaialble in the ChemDoodle Web Components core.
     * It is added by including the ChemDoodle Web Components uis extensions.
     */
    class SketcherCanvas extends _Canvas {
        constructor(
            id: string,
            width: number,
            height: number,
            options: {
                isMobile?: boolean
                useServices?: boolean
                oneMolecule?: boolean
                includeToolbar?: boolean
                floatDrawTools?: boolean
                resizable?: boolean
                includeQuery?: boolean
            }
        )

        /** this is one of the options, controls whether the sketcher optimizes itself for mobile or desktop use;
         * if not defined, this option will automatically default to the correct value after checking if it's environemnt is mobile or not */
        isMobile: boolean
        /** this is one of the options, controls whether or not the sketcher will provide functionality that access iChemLabs Cloud services */
        useServices: boolean
        /** this is one of the options, controls whether or not the sketcher will provide full sketching capabilities, or restrict the interface to allow only a single molecule to be drawn */
        oneMolecule: boolean
        /** this is one of the options, define this to false to exclude the toolbar */
        includeToolbar: boolean
        /** this is one of the options, define this to true if you want to show a floating toolbar for the drawing tools as in ChemDoodle 2D */
        floatDrawTools: boolean
        /** this is one of the options, define this to true if you want the sketcher to be resizable by the user */
        resizable: boolean
        /** this is one of the options, define this to true to inlcude query tools in the toolbar */
        includeQuery: boolean
        /** the toolbar manager */
        toolbarManager: uis.gui.desktop.ToolbarManager
        /** the state manager */
        stateManager: uis.states.StateManager3D
        /** the history manager */
        historyManager: uis.actions.HistoryManager
        /** the copy/paste manager */
        copyPasteManager: uis.CopyPasteManager
        /** the cursor manager */
        cursorManager: uis.gui.desktop.CursorManager
        /** the TextInput object used for text input in custom labels */
        textInput: uis.gui.desktop.TextInput
        /**
         * if this is not undefined, the sketcher goes into modal mode and all input events are blocked;
         * this value is a pointer to the current modal popup, and is closed automatically when the user clicks on sketcher outside of the popover
         */
        modal: uis.gui.desktop.Popover
        /** if this is defined, there is a tray open on the floating toolbar, and this parameter is a pointer to that tray */
        openTray: uis.gui.desktop.Tray
        /** true if the user is hovering over the help icon */
        isHelp: boolean
        /** keeps track of the pinch gesture */
        lastPinchScale: number
        /** keeps track of the two finger rotate gesture */
        lastGestureRotate: number
        /** this keeps track of where the mouse is over the canvas, set in State */
        lastMousePos: structures.Point
        /** this keeps track of the last drag gesture position, set in State */
        lastPoint: structures.Point
        /** the atom that follows the pointer in the full sketcher */
        startAtom: structures.Atom
        /** the lasso, only declared in the full sketcher */
        lasso: uis.tools.Lasso

        /** confines the scale of the sketcher */
        checkScale(): void

        /** set up some internal variables on executing an action, currently checks query shapes for errors, override this for your custom sketcher listeners; if force is false, the function remembers that it should do this when next called by true, which is called in _Canvas.repaint() */
        checksOnAction(force: boolean): void

        /** draws extra graphics for the sketcher */
        drawSketcherDecorations(ctx: CanvasRenderingContext2D): void

        /** scales the event for the current scale of the sketcher */
        scaleEvent(e: JQuery.Event): void

        /** set up some internal variables before repainting */
        checksBeforeRepaint(): void

        /** performs the mouse click action */
        click(e: JQuery.Event): void

        /** performs the mouse dblclick action */
        dblclick(e: JQuery.Event): void

        /** performs the drag action */
        drag(e: JQuery.Event): void

        /** draws extra graphics on top of the base graphics */
        drawChildExtras(ctx: CanvasRenderingContext2D): void

        /** performs the gesturechange action */
        gesturechange(e: JQuery.Event): void

        /** performs the gestureend action */
        gestureend(e: JQuery.Event): void

        /** performs the keydown action */
        keydown(e: JQuery.Event): void

        /** performs the keypress action */
        keypress(e: JQuery.Event): void

        /** performs the keyup action */
        keyup(e: JQuery.Event): void

        /** performs the mousedown action */
        mousedown(e: JQuery.Event): void

        /** performs the mouseout action */
        mouseout(e: JQuery.Event): void

        /** performs the mouseover action */
        mouseover(e: JQuery.Event): void

        /** performs the mouseup action */
        mouseup(e: JQuery.Event): void

        /** performs the mousewheel action */
        mousewheel(e: JQuery.Event): void

        /** performs the mouse rightclick action */
        rightclick(e: JQuery.Event): void

        /** performs the rightmousedown action */
        rightmousedown(e: JQuery.Event): void

        /** performs the rightmouseup action */
        rightmouseup(e: JQuery.Event): void

        /** performs the touchend action */
        touchend(e: JQuery.Event): void

        /** performs the touchmove action */
        touchmove(e: JQuery.Event): void

        /** performs the touchstart action */
        touchstart(e: JQuery.Event): void
    }

    /** 
     * is a child of the Canvas class and provides a 3D molecular editing environment.
     * This class is not avaialble in the ChemDoodle Web Components core.
     * It is added by including the ChemDoodle Web Components uis extensions.
     */
    class EditorCanvas3D extends _Canvas3D {
        constructor(
            id: string,
            width: number,
            height: number,
            options: {
                isMobile?: boolean
                useServices?: boolean
                includeToolbar?: boolean
            }
        )

        /** this is one of the options, controls whether the sketcher optimizes itself for mobile or desktop use;
         * if not defined, this option will automatically default to the correct value after checking if it's environemnt is mobile or not */
        isMobile: boolean
        /** this is one of the options, controls whether or not the sketcher will provide functionality that access iChemLabs Cloud services */
        useServices: boolean
        /** this is one of the options, define this to false to exclude the toolbar */
        includeToolbar: boolean
        /** the toolbar manager */
        toolbarManager: uis.gui.desktop.ToolbarManager
        /** the state manager */
        stateManager: uis.states.StateManager
        /** the history manager */
        historyManager: uis.actions.HistoryManager

        /** performs the mouse click action */
        click(e: JQuery.Event): void

        /** performs the mouse dblclick action */
        dblclick(e: JQuery.Event): void

        /** performs the drag action */
        drag(e: JQuery.Event): void

        /** performs the keydown action */
        keydown(e: JQuery.Event): void

        /** performs the keypress action */
        keypress(e: JQuery.Event): void

        /** performs the keyup action */
        keyup(e: JQuery.Event): void

        /** performs the mousedown action */
        mousedown(e: JQuery.Event): void

        /** performs the mouseout action */
        mouseout(e: JQuery.Event): void

        /** performs the mouseover action */
        mouseover(e: JQuery.Event): void

        /** performs the mouseup action */
        mouseup(e: JQuery.Event): void

        /** performs the mousewheel action */
        mousewheel(e: JQuery.Event): void

        /** performs the mouse rightclick action */
        rightclick(e: JQuery.Event): void

        /** performs the rightmousedown action */
        rightmousedown(e: JQuery.Event): void

        /** performs the rightmouseup action */
        rightmouseup(e: JQuery.Event): void
    }

    /**
     * the StoichiometryTable class produces a chemically intelligent and self-calculating table for stoichiometry calculations.
     * It is modeled after the stoichiometry table tool in ChemDoodle 2D.
     * This component is based on a <table> element instead of a <canvas> element.
     */
    class StoichiometryTable {
        constructor(id: string, options: Object)

        /** this is the cancel button for the cell data input */
        buttonCancel: uis.gui.desktop.Button
        /** this is the clear button for the cell data input */
        buttonClear: uis.gui.desktop.Button
        /** this is the current state of the stoichiometry table */
        currentTableData: Object
        /** this is the jQuery reference to the table element in the DOM */
        tableContainer: Object

        /** closes the currently opened edit component for a cell in the table, committing the action only if the commit parameter is true */
        closeEdit(commit: boolean): void

        /** closes the currently opened edit component if the user clicks elsewhere on the page */
        closeEditCheckNotInEditDiv(): void

        /** 
         * produces the HTML for the edit component for the cells where users input values and units, returning the HTML as a String
         * @returns {string} html
         */
        makeEditComponent(): string

        /** 
         * produces the container HTML where the stoichiometry table will exist, returning the HTML as a String
         * @returns {string} html
         */
        makeTableContainer(): string

        /** handles the original creation of the stoichiometry table based on the input data; the data object can be either a String (written equation) or a drawn reaction  */
        serverSetup(data: Object): void

        /** handles the updating of the stoichiometry table given the updated table data */
        serverUpdate(currentTableData: JQuery.Event): void

        /** defines the user interactivity actions for the stoichiometry table and its cells */
        setupInteractivity(): void

        /** produces the HTML for the stoichiometry table based on the input tableData */
        setupStoichiometryTable(tableData: Object): void

        /** updates the DOM elements for the stoichiometry table based on the input tableData */
        updateStoichiometryTable(tableData: Object): void

    }

    /** this package contains helper functions for classes that the ChemDoodle Web Components library doesn't own. */
    module extensions {
        /** draws a ellipse given an input Context, x and y coordinates for the center position, and a width and height */
        function contextEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void

        /** draws a rounded rectangle given an input Context, x and y coordinates for the center position, height, width, and radius */
        function contextRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void

        /** 
         * generates a valid CSS font string based on the input parameters
         * @returns {string} html
         */
        function getFontString(size: number, family: string, bold: boolean, italic: boolean): string

        /** returns the angle between the two input vec3 objects */
        function vec3AngleFfrom(v1: vec3, v2: vec3): number
    }

    /** this package contains several convenience methods to check for support of verious HTML5 features that the ChemDoodle Web Components library uses. */
    module featureDetection {
        /** returns a boolean corresponding to the browser's support for the HTML5 <canvas> tag */
        function supports_canvas(): boolean

        /** returns a boolean corresponding to the browser's support for HTML5 <canvas> text rendering */
        function supports_canvas_text(): boolean

        /** returns a boolean corresponding to the browser's support for gesture events; this is useful for determining if the current browser can support pinching and zooming, and to resort to ChemDoodle's handlers if necessary */
        function supports_gesture(): boolean

        /** returns a boolean corresponding to the browser's support for touch events; this is useful for determining if the current browser is on a mobile platform */
        function supports_touch(): boolean

        /** returns a boolean corresponding to the browser's support for WebGL */
        function supports_webgl(): boolean

        /** this method checks the browser's support for XMLHttpRequest Level 2 functionality */
        function supports_xhr2(): boolean
    }

    /** 
     * this package connects to iChemLabs cloud services through AJAX XMLHttpRequest Level 2 for complete access to the entire ChemDoodle Java API.
     * Please see the {@link https://web.chemdoodle.com/docs/ichemlabs-cloud-services|iChemLabs Cloud services} documentation for details.
     */
    module iChemLabs { }

    /** this package hosts all classes that perform cheminformatics algorithms. */
    module informatics {
        /** returns the pixel/Ängstrom ratio that is currently defined by the default ChemDoodle settings */
        function getPointsPerAngstrom(): number

        /** is a class for analyzing bonds based on 3D coordinates */
        class BondDeducer {
            /** the amount of flexibility in calculating bonds; the larger the number, the more bonds found */
            margin: number

            /**
             * deduces covalent bonds for the input molecule and appends them to the molecule's bonds array.
             * Uses the covalent radii data provided in atomicData.
             * The customPointsPerAngstrom parameters allows you to change the value from that specified by default.
             */
            deduceCovalentBonds(molecule: structures.Molecule, customPointsPerAngstrom: number): void
        }

        /** is a class for manipulating hydrogens */
        class HydrogenDeducer {
            /**
             * removes all hydrogens and bonds attached to them from the given molecule;
             * if removeStereo is not set to true, then hydrogens connected with wedge bonds are retained
             */
            removeHydrogens(molecule: structures.Molecule, removeStereo: boolean): void
        }

        /** is a class for splitting a Molecule data structure composed of discrete graphs into individual discrete Molecule objects */
        class Splitter {
            /** returns an array consisting of each discrete graph data structure in the input molecule, as individual discrete Molecule objects */
            split(molecule: structures.Molecule): structures.Molecule[]
        }

        /** is a class for copying and creating molecular structures */
        class StructureBuilder {
            /** returns a new Molecule object that is a copy of the input Molecule */
            copy(molecule: structures.Molecule): structures.Molecule
        }

        /**
         * is an interface for calculating integer descriptors given a Molecule object.
         * It should not be instantiated.
         * To obtain a value from a Counter, use the following command where mol is a Molecule object and ChildOfCounter is a child of the Counter class:
         * new ChildOfCounter(mol).value
         */
        abstract class _Counter {
            /** the result of the Counter algorithm */
            value: number
            /** holds the Molecule object being analyzed by the child derivative */
            molecule: structures.Molecule

            /** 
             * sets the molecule and performs the descriptor calculation.
             * Should be called as the last method in all child constructors.
             */
            setMolecule(molecule: structures.Molecule): void

            /**
             * this method is defined by all child classes of Counter.
             * This method should calculate the descriptor value given the Molecule stored.
             */
            abstract innerCalculate(molecule: structures.Molecule): void
        }

        /** is a child of the Counter class and calculates the Frèrejacque Number, which is the SSSR count. */
        class FrerejacqueNumberCounter extends _Counter {
            constructor(molecule: structures.Molecule)

            /** calculates the Frèrejacque Number. This should never be manually called as it is called by the constructor after setup. */
            innerCalculate(molecule: structures.Molecule): void
        }

        /** is a child of the Counter class and calculates the real number of molecules in a Molecule object, which can hold disjoint graphs. */
        class NumberOfMoleculesCounter extends _Counter {
            constructor(molecule: structures.Molecule)

            /** calculates the number of molecules. This should never be manually called as it is called by the constructor after setup. */
            innerCalculate(molecule: structures.Molecule): void
        }

        /**
         * is an interface for ring perception algorithms.
         * It should not be instantiated. 
         * Contains helper methods for ring perception and for storing rings.
         * So to obtain a ring set, use the following command where mol is a Molecule object and ChildOfRingFinder is a child of the RingFinder class:
         * new ChildOfRingFinder(mol).rings */
        abstract class _RingFinder {
            /** all atoms that will be analyzed during ring perception are stored here, set by RingFinder.reduce() */
            atoms: structures.Atom[]
            /** all bonds that will be analyzed during ring perception are stored here, set by RingFinder.reduce() */
            bonds: structures.Bond[]
            /** this array holds all the perceived rings */
            rings: structures.Ring[]

            /** a helper method to find the bonds that belong to the perceived rings if only the atoms are specified. */
            fuse(): void

            /** reduces this input molecule graph to discard most non-ring atons and all lone atoms to speed up runtimes, sets the atoms and bonds Arrays to the reduced graph. */
            reduce(molecule: structures.Molecule): void

            /** sets the molecule and performs the ring perception. Should be called as the last method in all child constructors. */
            setMolecule(molecule: structures.Molecule): void

            /** this method is defined by all child classes of RingFinder. This method should find rings based on the reduced atoms and bonds Arrays and then place perceived rings in the rings Array. */
            abstract innerGetRings(molecule: structures.Molecule): void
        }

        /** 
         * perceives the Smallest Set of Smallest Rings (SSSR) as defined by Plotkin.
         * The SSSR set is not unique.
         * This is not a child of the RingFinder class, as it uses the EulerFacetRingFinder class to perceive rings, and the SSSR is retrieved from that result.
         * It works identically to a RingFinder derivative.
         */
        class SSSRFinder {
            constructor(molecule: structures.Molecule)

            /** this array holds all the perceived rings */
            rings: structures.Ring[]
        }

        /**
         * is a child of the RingFinder class and perceives a set of rings that defines all Euler facets in a molecule using an algorithm developed by Kevin Theisen.
         * This ring set is thorough, unique and adequately describes rings as a 3D representation of a 2D drawing.
         */
        class EulerFacetFinder extends _RingFinder {
            /** 
             * is a cutoff for the size of rings to be found.
             * Defines the length of a ring path which is half of a ring.
             * So a value of 5 specifies that only 8 membered rings and smaller should be perceived.
             * Use this setting to improve performance.
             */
            fingerBreak: number

            /** 
             * implements the algorithm to find the Euler facet ring set.
             * This should never be manually called as it is called by the constructor after setup.
             */
            innerGetRings(molecule: structures.Molecule): void
        }
    }

    /** this package contains various classes and tools for converting chemical data between formats. */
    module io {
        /** recover a Molecule from JSON format */
        function fromJSONDummy(content: Object): structures.Molecule

        /** convert a Molecule to a consise Object that represents the chemical data for use in JSON protocol */
        function toJSONDummy(mol: structures.Molecule): Object

        /**
         * is an interface for reading and writing chemical data.
         * It should not be instantiated.
         * Contains helper methods for dealing with data.
         */
        abstract class _Interpreter {
            /** helper method for formating data in MDL-like syntaxes. */
            fit(data: string, length: number, leftAlign: boolean): void
        }

        /** handles converting Javascript objects to and from the ChemDoodle JSON format, this is NOT a child of the Interpreter class */
        class JSONInterpreter {
            constructor()

            /** 
             * given the input object represented in ChemDoodle JSON (object, not the string),
             * this function will create the corresponding Object data structure containing an Array of Molecule data structures named molecules and an Array of Shape data structures named shapes
             */
            contentFrom(dummy: Object): Object

            /**
             * creates a dummy object from the input molecules and shapes Arrays corresponding to the ChemDoodle JSON format;
             * use JSON.stringify() to create a JSON string from this dummy object
             */
            contentTo(mols: structures.Molecule[], shapes: structures.d2._Shape): Object

            /** given the input object represented in ChemDoodle JSON (object, not the string), this function will create the corresponding Molecule data structure */
            molFrom(dummy: Object): structures.Molecule

            /** creates a dummy object from the input Molecule data structure corresponding to the ChemDoodle JSON format; use JSON.stringify() to create a JSON string from this dummy object */
            molTo(mol: structures.Molecule): Object

            /** given the input object represented in ChemDoodle JSON (object, not the string), this function will create the corresponding Query data structure */
            queryFrom(dummy: Object): structures.Query

            /** creates a dummy object from the input Query data structure corresponding to the ChemDoodle JSON format; use JSON.stringify() to create a JSON string from this dummy object */
            queryTo(mol: structures.Molecule): Object

            /** given the input object represented in ChemDoodle JSON (object, not the string), this function will create the corresponding Shape data structure; the second parameter is the array of molecules already read, just incase the shape is dependent upon them */
            shapeFrom(dummy: Object, mols: structures.Molecule[]): structures.d2._Shape

            /** creates a dummy object from the input Shape data structure corresponding to the ChemDoodle JSON format; use JSON.stringify() to create a JSON string from this dummy object */
            shapeTo(shape: structures.d2._Shape): Object
        }

        /** reads IUPAC JCAMP-DX files, is a child of the Interpreter class */
        class JCAMPInterpreter extends _Interpreter {
            constructor()
            /** if true, and the file being read is a NMR spectrum in HZ, then the interpreter will automatically convert the x-axis into PPM */
            convertHZ2PPM: boolean

            /** given an input JCAMP file with structure colleration data, this function creates two canvases,
             * one for a molecule and one for the spectrum,
             * where each has hover events (or touch on mobile) to highlight peaks and the corresponding parts of the molecular structure;
             * the input id is used to generate the canvases, or find previously created canvases;
             * the array that is returned contains the molecule ChemDoodle Web Component and the spectrum ChemDoodle Web Component objects in that order */
            makeStructureSpectrumSet(id: string, content: string): (structures.Molecule | structures.Spectrum)[]

            /** reads the JCAMP file content and returns the corresponding Spectrum */
            read(content: string): structures.Spectrum
        }

        /** reads and writes MDL MOLFiles, both v2000 and v3000, is a child of the Interpreter class */
        class MOLInterpreter extends _Interpreter {
            constructor()
            /** when writing V3000 MOLFiles by instantiating this class, first set this parameter to 3 */
            version: number

            /** 
             * reads MOLFile content and returns the corresponding molecule;
             * this function will automatically detect v2000 and v3000 MOLFiles and handle them accordingly;
             * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Angstroms
             */
            read(content: string, multiplier?: number): structures.Molecule

            /** writes and returns a String containing the MOLFile of the given molecule */
            write(molecule: structures.Molecule): string
        }

        /** reads and writes MDL RXNFiles (v2000), is a child of the Interpreter class */
        class RXNInterpreter extends _Interpreter {
            constructor()
            /**  
             * reads RXNFile content and returns an object containing the corresponding content.
             * The Object possesses an array of Molecules which an be accessed with the name 'molecules' and a shape array by the name of 'shapes' which contains only one Line data structure representing the arrow.
             * The optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Angstroms
             */
            read(content: string, multiplier?: number): structures.Molecule

            /** writes and returns a String containing the RXNFile of the given molecules and shapes */
            write(molecules: structures.Molecule, shapes: structures.d2._Shape): string
        }

        /** reads XYZ files, is a child of the Interpreter class */
        class XYZInterpreter extends _Interpreter {
            constructor()
            /** if true, the XYZInterpreter will also calculate covalent bonds for input atoms */
            deduceCovalentBonds: structures.Molecule

            /** reads XYZ file content and returns the corresponding molecule */
            read(content: string): structures.Molecule
        }

        /** reads RCSB PDB files, is a child of the Interpreter class */
        class PDBInterpreter extends _Interpreter {
            constructor()
            /** if true, the PDBInterpreter deduce bonds between residue atoms */
            deduceResidueBonds: structures.Molecule
            /** if true, the PDBInterpreter will also calculate distances for all protein and nucleic acid atoms to the closest ligand atoms for use in display. If no ligand atoms are present, then all atoms will be given a measured distance of 0 */
            calculateRibbonDistances: structures.Molecule

            /** 
             * reads the PDB file content and returns the corresponding Molecule;
             * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Angstroms */
            read(content: string, multiplier?: number): structures.Molecule
        }

        /** reads Crystallographic Information Files (CIF), is a child of the Interpreter class */
        class CIFInterpreter extends _Interpreter {
            constructor()
            /** 
             * Given the lengths and angles of the unit cell,
             * a matrix is calculated (represented in an Array) of the transform matrix from ABC coordinates to XYZ coordinates
             * 
             * @param {number} a Angstroms
             * @param {number} b Angstroms
             * @param {number} c Angstroms
             * @param {number} alpha radians
             * @param {number} beta radians
             * @param {number} gamma radians
             */
            static generateABC2XYZ(a: number, b: number, c: number, alpha: number, beta: number, gamma: number): number[][]

            /** 
             * reads a CIF file and returns the corresponding Molecule and unit cell shape;
             * the returned object will contain two parameters, molecule and unitCell;
             * the three optional integers specify the supercell dimensions, by default they are all 1,
             * so reading a file without specifying these parameters will produce just the unit cell.
             * In addition to reading atoms from CIF files,
             * this interpreter will also produce a unit cell and other objects relevant to the display of periodic information
             */
            read(content: string, xSuper: number, ySuper: number, zSuper: number): structures.Molecule
        }

        /** 
         * reads Chemical Markup Language files, is a child of the Interpreter class.
         * Currently supports molecules only, no reactions.
         */
        class CMLInterpreter extends _Interpreter {
            constructor()

            /** 
             * reads CML content and returns an object containing the corresponding content.
             * The Object possesses an array of Molecules which an be accessed with the name 'molecules'.
             */
            read(content: string): Object

            /** writes and returns a String containing the CML of the given molecules. */
            write(molecules: structures.Molecule): string
        }

        /** this package deals with files. */
        module file {
            /**
             * retrieves the content of a file given an input url; 
             * the content is sent to the callback function provided; 
             * note that this function uses AJAX, so it will only work for files local to the same origin calling it, 
             * unless the server supports XHR2
             */
            function content(url: string, callback: Function): void
        }

        /** this package generates Portable Network Grpahics (PNG) images from canvases. */
        module png {
            /** 
             * creates a PNG image from the input Canvas object and downloads the file to the user's default download location.
             * The name of the file is the second parameter, which will default to "unnamed" if not provided.
             */
            function download(canvas: _Canvas, filename?: string): void

            /** creates a PNG image from the input Canvas object and opens it in a new window or tab based on the user's browser settings. */
            function open(canvas: _Canvas): void

            /** 
             * creates a PNG image from the input Canvas object as a String and returns it;
             * the String will be prepended with "data:image/png;base64,".
             */
            function string(canvas: _Canvas): string
        }

        /** 
         * this package generates Web Scalable Vector Graphics (SVG) images from canvases.
         * This class can only generate SVGs for 2D Canvases.
         * (Proprietary Only)
         */
        module svg {
            /** 
             * creates a SVG image from the input Canvas object and downloads the file to the user's default download location.
             * The name of the file is the second parameter, which will default to "unnamed" if not provided.
             */
            function download(canvas: _Canvas, filename?: string): void

            /** creates a SVG image from the input Canvas object and opens it in a new window or tab based on the user's browser settings. */
            function open(canvas: _Canvas): void

            /** creates a SVG image from the input Canvas object as a String and returns it. */
            function string(canvas: _Canvas): string
        }

    }

    /** this package contains various mathematical algorithms. */
    module math {
        /**
         * returns an object with two parameters (angle, largest);
         * angle points between the largest gap of the input Array of angles in radians,
         * largest is the value of the angle between the bonds of the largest gap in radians
         */
        function angleBetweenLargest(data: Object): number

        /** this is a helper method to alter an angle in radians to be between 0 and 2pi and with an additional parameter to convert to degrees and a last parameter to constrain under Pi (so it will give the 2Pi complement) */
        function angleBounds(value: number, convertToDegrees: boolean, constrainToPi: boolean): number

        /**
         * returns the distance of a line inscribed in a rectangle, given that the line has only 1 endpoint in the rectangle;
         * the rectangle is a object with self-explanatory parameters x, y, w, and h
         */
        function calculateDistanceInterior(to: structures.Point, from: structures.Point, r: Object): number

        /**
         * return the value if it is between the min and max, inclusive; returns the min if the value is less than the min,
         * returns the max if the value is greater than the max
         */
        function clamp(value: number, min: number, max: number): number

        /**
         * returns the shortest (tangent) distance from the input Point to the line with endpoints defined by the last two input Points.
         * This works by rotating the frame such that the line starts at the origin and points up along the x-axis,
         * and the absolute value of the rotated input Point x-coordinate is returned.
         *  If the input Point's y-coordinate is not between the endpoints, inclusively, a value of -1 is returned.
         * The retract parameter is optional and will buffer the ends of the line from hitting with that magnitue if provided.
         */
        function distanceFromPointToLineInclusive(p: structures.Point, l1: structures.Point, l2: structures.Point, retract: number): number

        /** returns a 3 membered Array of Numbers corresponding to the RGB magnitudes of the input hex string and multiplied by the input multiplier */
        function getRGB(hex: string, mutliplier: number): number[]

        /** convert HSL (values between 0 and 1) color to RGB values */
        function hsl2rgb(h: number, s: number, l: number): number[]

        /** this is a helper method for our WebGL picking system */
        function idx2color(value: number): string

        /** returns the intersection of two non-parallel line segments, if they intersect */
        function intersectLines(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): structures.Point

        /** returns true if the first input parameter is between the last two input parameters, inclusively */
        function isBetween(x: number, left: number, right: number): boolean

        /** return true if the Point pt is in Polygon poly */
        function pointInPoly(poly: Object, pt: structures.Point): boolean

        /** returns an rgb color as a CSS string, this is a helper function for the rainbow coloring in ribbons */
        function rainbowAt(i: number, ii: number, colors: string[]): string


        /** manages 2D and 3D bounds information for graphical objects */
        class Bounds {
            constructor()

            /** the minimum X value for the rectangle that represents these bounds */
            minX: number
            /** the minimum Y value for the rectangle that represents these bounds */
            minY: number
            /** the maximum X value for the rectangle that represents these bounds */
            maxX: number
            /** the maximum Y value for the rectangle that represents these bounds */
            maxY: number
            /** the minimum Z value for the rectangular prism that represents these bounds */
            minZ: number
            /** the maximum Z value for the rectangular prism that represents these bounds */
            maxZ: number

            /** 
             * this Bounds object will expand the bounds of the current rectangle using the x and y data provided;
             * two sets of coordinates can be provided, but the second set is optional (this way you can expand by point or by rectangle)
             */
            expand(x1: number, y1: number, x2: number, y2: number): void

            /** 
             * this Bounds object will expand the bounds of the current rectangle
             * (or rectangular prism, if z coordinate information is provided)
             * using the Bounds data provided by the bounds2 parameter
             */
            expand(bounds2: math.Bounds): void

            /** 
             * this Bounds object will expand the bounds of the current rectangular prisms using the x, y and z data provided;
             * two sets of coordinates can be provided, but the second set is optional
             * (this way you can expand by point or by rectanglular prism)
             */
            expand3D(x1: number, y1: number, x2: number, y2: number, z1: number, z2: number): void
        }
    }

    /** 
     * this package keeps track of user input on the current page,
     * such as the Canvas that is focused and what modifier keys are pressed on the keyboard
     */
    module monitor {
        /** keeps track of whether the shift key is held down */
        const SHIFT: boolean
        /** keeps track of whether the alt key is held down */
        const ALT: boolean
        /** keeps track of whether the operating system specific meta key is held down (CTRL on Windows/Linux, CMD on Mac) */
        const META: boolean
        /**
         * keeps track of the canvas that the mouse is currently over.
         * This is undefined if the mouse is over no canvas
         */
        const CANVAS_OVER: _Canvas | undefined
        /**
         * keeps track of the canvas that the mouse is currently dragging from.
         * This is undefined if no Canvas is currently being dragged from
         */
        const CANVAS_DRAGGING: _Canvas | undefined
    }

    /** this package hosts all data structures provided by the ChemDoodle Web Components library. */
    module structures {

        /**
         * is data structure for holding information about an element.
         * This is a private class that cannot be instantiated, however, the Elements in the ELEMENT array can be extended.
        */
        class Element {
            protected constructor(symbol: string, name: string, atomicNumber: number)

            /** the symbol of the element */
            symbol: string
            /** the name of the element */
            name: string
            /** the atomic number of the element */
            atomicNumber: number
            /** if true, implicit hydrogens are added to this element */
            addH: boolean
            /** the covalent radius of the element */
            covalentRadius: number
            /** the van der Waals radius of the element */
            vdWRadius: number
            /** the Jmol color of the element */
            jmolColor: string
            /** the PyMOL color of the element; all colors are the same as the Jmol set except: H, C, N, O, F, S */
            pymolColor: string
            /** the integer value for the mass of the most abundant isotope of the element */
            mass: number
            /** the maximum valency for an element, or 0 if unknown  */
            valency: number
        }

        /** 
         * is data structure for holding information about residue types.
         * This is a private class that cannot be instantiated, however, the Residues in the RESIDUE array can be extended.
         */
        class Residue {
            protected constructor(symbol: string, name: string, atomicNumber: number)

            /** the symbol of the residue */
            symbol: string
            /** the name of the residue */
            name: string
            /** just for amino acids, true if polar, false if non-polar */
            polar: boolean
            /** the color of the residue in the "amino" color set */
            aminoColor: string
            /** the color of the residue in the "shapely" color set */
            shapelyColor: string
            /** the acidity of the residue, -1 for acidic, 0 for neutral, 1 for basic */
            acidity: number
        }

        /**
         * is data structure for holding information about a single cell in the periodic table for the PeriodicTableCanvas.
         * This is a private class that cannot be instantiated.
         */
        class PeriodicCell {
            protected constructor(element: structures.Element, x: number, y: number, dimension: number)

            /** the corresponding element */
            element: Element
            /** the x coordinate of the top-left corner of the cell */
            x: number
            /** the y coordinate of the top-left corner of the cell */
            y: number
            /** the width and height of the square cell */
            dimension: number
        }

        /**
         * The Styles structure contains all the variables that define how all objects are drawn on the canvas.
         * The style variables are categorized based on the objects they modify and the names of those variables are prepended with the category.
         * For instance, spectrum settings all begin with the "plots_" prepend.
         * All of these styles are set by the defaults when a Canvas is constructed.
         * The default variables are defined by the global ChemDoodle.DEFAULT_STYLES, which an object containing all the defined styles.
         * Change the default settings to enforce a style sheet on an entire webpage.
         * You can create a copy of a Styles object by sending in the instance to be copied into the Styles constructor;
         * of course, if nothing is provided into the constructor, the default styles are used.
         */
        class Styles {
            constructor(copy: structures.Styles)


            // Canvas Specifications

            /** background color of the canvas, set this to undefined to create a see-through canvas */
            backgroundColor: String
            /** scale of the canvas, set this after the molecule has been loaded, then repaint the canvas */
            scale: Number
            /** rotation angle of the canvas */
            rotateAngle: Number
            /** length of the bonds, set the default_ before using an interpreter to read your file; for 2D depiction */
            bondLength_2D: Number
            /** number of Angstroms per bond length */
            angstromsPerBondLength: Number
            /** the direction the lighting points in 3D scenes */
            lightDirection_3D: Array<number>
            /** the diffusive light color in 3D scenes */
            lightDiffuseColor_3D: String
            /** the specular light color in 3D scenes */
            lightSpecularColor_3D: String
            /** if true, a perspective projection will be used, if false, an orthographic projection will be used */
            projectionPerspective_3D: Boolean
            /** the field of view angle for the perspective projection matrix in 3D scenes */
            projectionPerspectiveVerticalFieldOfView_3D: Number
            /** the width of the orthographic projection matrix in 3D scenes */
            projectionOrthoWidth_3D: Number
            /** 
             * the width/height ratio for the projection matrix in 3D scenes;
             * this setting is automatically handled by the canvas given its dimensions,
             * but can be overridden if preferred (if the value is undefined, then this setting is ignored),
             * this should be width/height of your canvas to keep the aspect ratio square
             */
            projectionWidthHeightRatio_3D: Number
            /** the near camera cutoff distance in 3D scenes */
            projectionFrontCulling_3D: Number
            /** the far camera cutoff distance in 3D scenes */
            projectionBackCulling_3D: Number
            /** if true, enables the rendering optimization not to render the mesh polygons facing away from the camera */
            cullBackFace_3D: Boolean
            /** this number defines the fogging algorithm used during the rendering of 3D scenes; 0 - No Fogging, 1 - Linear, 2 - EXP, 3 - EXP^2 */
            fog_mode_3D: Number
            /** the fog color */
            fog_color_3D: String
            /** the clip to start fogging along the objects */
            fog_start_3D: Number
            /** the clip to end fogging along the objects */
            fog_end_3D: Number
            /** this number affects the fogging algorithms in different ways, but it related to the magnitude */
            fog_density_3D: Number
            /** if true, render a cast shadow to the scene */
            shadow_3D: Boolean
            /** This number, between 0-1, defines the intensity of the shadow, with 0 not shading anything and 1 completely shading covered geometry to black */
            shadow_intensity_3D: Number
            /** if true, renders the scene using a flat color for each object (essentially no first pass shading) */
            flat_color_3D: Boolean
            /** if true, enables software antialiasing (which is not as good as hardware antialiasing);
             * this is useful when using deferred shading techniques */
            antialias_3D: Boolean
            /** defines the gamma correction value for rendering 3D scenes */
            gammaCorrection_3D: Number
            /** the hover color used for graphics */
            colorHover: String
            /** the select color used for graphics */
            colorSelect: String
            /** the error color used for graphics */
            colorError: String
            /** the preview color used for graphics */
            colorPreview: String


            // 3D Shader Specifications

            /** enable screen space ambient occlusion (SSAO) */
            ssao_3D: Boolean
            /** kernel radius setting for the SSAO shader */
            ssao_kernel_radius: Number
            /** the number of kernel samples to use, must be an integer */
            ssao_kernel_samples: Number
            /** power setting for the SSAO shader */
            ssao_power: Number
            /** enable outlining */
            outline_3D: Boolean
            /** thickness setting for the outline shader */
            outline_thickness: Number
            /** normal threshold setting for the outline shader */
            outline_normal_threshold: Number
            /** depth threshold setting for the outline shader */
            outline_depth_threshold: Number
            /** depth threshold setting for the FXAA antialiasing shader */
            fxaa_edgeThreshold: Number
            /** depth threshold setting for the FXAA antialiasing shader */
            fxaa_edgeThresholdMin: Number
            /** the number of search steps to perform for the FXAA antialiasing shader */
            fxaa_searchSteps: Number
            /** serch threshold setting for the FXAA antialiasing shader */
            fxaa_searchThreshold: Number
            /** subpixel cap setting for the FXAA antialiasing shader */
            fxaa_subpixCap: Number
            /** subpixel trim setting for the FXAA antialiasing shader */
            fxaa_subpixTrim: Number


            // Atom Specifications

            /** draw the atoms */
            atoms_display: Boolean
            /** atom color */
            atoms_color: String
            /** atom text font size for 2D depiction */
            atoms_font_size_2D: Number
            /** the atom text font families, families cascade through the array if not found on the users computer; for 2D depiction */
            atoms_font_families_2D: String[]
            /** atom text will be bold */
            atoms_font_bold_2D: Boolean
            /** atom text will be italicized */
            atoms_font_italic_2D: Boolean
            /** draw atoms as circles, text is not drawn; for 2D depiction */
            atoms_circles_2D: Boolean
            /** diameter of atom circles for 2D depiction */
            atoms_circleDiameter_2D: Number
            /** width of atom circle borders for 2D depiction */
            atoms_circleBorderWidth_2D: Number
            /** use Jmol colors for atoms */
            atoms_useJMOLColors: Boolean
            /** use PyMOL colors for atoms, will default to Jmol if that specification is also true */
            atoms_usePYMOLColors: Boolean
            /** render hydrogen atoms as black always in 2D canvases if this setting is true, irregardless of other color settings; this is useful when showing color sets in both 2D and 3D components on the same page */
            atoms_HBlack_2D: Boolean
            /** render implicit hydrogens on all labels that are visible */
            atoms_implicitHydrogens_2D: Boolean
            /** show labels for terminal carbons */
            atoms_displayTerminalCarbonLabels_2D: Boolean
            /** show hidden carbons that are located between two nearly parallel bonds of the same bond order */
            atoms_showHiddenCarbons_2D: Boolean
            /** show carbon labels for carbon atoms with an attribute (charge, radical, lone pair) associated */
            atoms_showAttributedCarbons_2D: Boolean
            /** show all carbon labels */
            atoms_displayAllCarbonLabels_2D: Boolean
            /** distance between the lone pairs and the atom */
            atoms_lonePairDistance_2D: Number
            /** distance between the electrons in lone pairs */
            atoms_lonePairSpread_2D: Number
            /** diameter of the dots representing electrons in lone pairs */
            atoms_lonePairDiameter_2D: Number
            /** the resolution of the sphere vertex buffer used to render atoms in 3D scenes */
            atoms_resolution_3D: Number
            /** the diameter of atoms in 3D scenes (for ball and stick and wireframe type representations); atoms_useVDWDiameters_3D overrides this property */
            atoms_sphereDiameter_3D: Number
            /** use van der Waals diameters for atoms */
            atoms_useVDWDiameters_3D: Boolean
            /** a multiplier for VDW radii */
            atoms_vdwMultiplier_3D: Number
            /** the ambient color for atoms in 3D scenes */
            atoms_materialAmbientColor_3D: String
            /** the specular color for atoms in 3D scenes */
            atoms_materialSpecularColor_3D: String
            /** the shininess of atoms in 3D scenes */
            atoms_materialShininess_3D: Number
            /** display non-bonded atoms using a star geometry, good for visualizing ions or water oxygens in PDB files */
            atoms_nonBondedAsStars_3D: Boolean
            /** display atom labels in WebGL components */
            atoms_displayLabels_3D: Boolean


            // Bond Specifications

            /** draw the bonds */
            bonds_display: Boolean
            /** bond color */
            bonds_color: String
            /** width of the bonds for 2D depiction; also controls the width of primitive lines for bonds rendered in WebGL scenes */
            bonds_width_2D: Number
            /** use absolute widths for saturation spacing if true; if false, use the relative value */
            bonds_useAbsoluteSaturationWidths_2D: Boolean
            /** relative saturation width of double and triple bond lines for 2D depiction */
            bonds_saturationWidth_2D: Number
            /** absolute saturation width of double and triple bond lines for 2D depiction */
            bonds_saturationWidthAbs_2D: Number
            /** bond end style for 2D depiction */
            bonds_ends_2D: 'butt' | 'round' | 'square'
            /** color the bond in half based on the colors of the connected atoms; in 2D the type of fill is controlled by the bonds_colorGradient specification */
            bonds_splitColor: Boolean
            /** color the bond by using a gradient between the two colors of the constituent atoms, rather than by using a color split */
            bonds_colorGradient: Boolean
            /** the angle that saturated double bonds are clipped by for 2D depiction */
            bonds_saturationAngle_2D: Number
            /** double bonds are drawn symmetrically always, instead of pointing towards the center of a ring, for instance; for 2D depiction */
            bonds_symmetrical_2D: Boolean
            /** draws a small background to the bond in the background color to contrast between overlapping bonds for 2D depiction */
            bonds_clearOverlaps_2D: Boolean
            /** the extent of the overlap clearing in both directions for 2D depiction */
            bonds_overlapClearWidth_2D: Number
            /** the amount that the bond pulls back from atom text for 2D depiction */
            bonds_atomLabelBuffer_2D: Number
            /** the thickness of stereochemical wedge bonds for 2D depiction */
            bonds_wedgeThickness_2D: Number
            /** the amplitude of wavy bonds for 2D depiction */
            bonds_wavyLength_2D: Number
            /** the width of hashes for 2D depiction */
            bonds_hashWidth_2D: Number
            /** the spacing of hashes for 2D depiction */
            bonds_hashSpacing_2D: Number
            /** the diameter of dots used in bond rendering (usually for zero order bonds) */
            bonds_dotSize_2D: Number
            /** this setting controls how whole order bonds are rendered; bonds will be renedered in Lewis Dot style, with perpendicular electron pairs representing the bonds */
            bonds_lewisStyle_2D: Boolean
            /** renders higher bond orders with multiple cylinders if true, higher bond orders will orient themselves to face the camera */
            bonds_showBondOrders_3D: Boolean
            /** the resolution of the cylinder vertex buffer used to render bonds in 3D scenes */
            bonds_resolution_3D: Number
            /** renders bonds as primitive lines in WebGL scenes, instead of as meshes */
            bonds_renderAsLines_3D: Boolean
            /** the diameter of bonds in 3D scenes */
            bonds_cylinderDiameter_3D: Number
            /** the latitude resolution of the pill vertex buffer used to render bonds in 3D scenes */
            bonds_pillLatitudeResolution_3D: Number
            /** the longitude resolution of the pill vertex buffer used to render bonds in 3D scenes */
            bonds_pillLongitudeResolution_3D: Number
            /** the length of hash segments of hash bonds in 3D scenes */
            bonds_pillHeight_3D: Number
            /** the spacing of hash bonds in 3D scenes */
            bonds_pillSpacing_3D: Number
            /** the diameter of hash bonds in 3D scenes */
            bonds_pillDiameter_3D: Number
            /** the ambient color for bonds in 3D scenes */
            bonds_materialAmbientColor_3D: String
            /** the specular color for bonds in 3D scenes */
            bonds_materialSpecularColor_3D: String
            /** the shininess of bonds in 3D scenes */
            bonds_materialShininess_3D: Number


            //Macromolecule Specifications

            /** render ribbons for proteins, if any */
            proteins_displayRibbon: Boolean
            /** render a stick trace along the alpha carbon backbone for proteins, if any */
            proteins_displayBackbone: Boolean
            /** render a pipe and plank model for proteins, if any */
            proteins_displayPipePlank: Boolean
            /** the thickness of the sticks used to render the alpha carbon backbone */
            proteins_backboneThickness: Number
            /** the color of the alpha carbon backbone trace */
            proteins_backboneColor: String
            /** display a cartoon version of the ribbons for proteins; by default ribbons and their edges are continuous, by using the cartoon model, ribbon edges will be constant widths for different parts of the structure and will jump at intersections, end of helices and sheets will render an arrowhead */
            proteins_ribbonCartoonize: Boolean
            /** color residues by segment when set; by default this is 'none', and residues will not be individually colored */
            proteins_residueColor: 'none' | 'amino' | 'shapely' | 'polarity' | 'acidity' | 'rainbow'
            /** the color of the front of the ribbon */
            proteins_primaryColor: String
            /** the color of the back of the ribbon' ticks */
            proteins_secondaryColor: String
            /** the color of the front of helices in cartoon models */
            proteins_ribbonCartoonHelixPrimaryColor: String
            /** the color of the back of helices in cartoon models */
            proteins_ribbonCartoonHelixSecondaryColor: String
            /** the color of sheets in cartoon models */
            proteins_ribbonCartoonSheetColor: String
            /** the color of the tubes for pipe and plank protein models */
            proteins_tubeColor: String
            /** the resolution of the tube used for pipe and plank protein models in 3D scenes */
            proteins_tubeResolution_3D: Number
            /** the thickness of the mesh for the ribbon */
            proteins_ribbonThickness: Number
            /** the thickness of tube meshes built for the pipe and plank models */
            proteins_tubeThickness: Number
            /** the thickness of the sheet planks built for the pipe and plank models */
            proteins_plankSheetWidth: Number
            /** the diameter of the helix cylinders built for the pipe and plank models */
            proteins_cylinderHelixDiameter: Number
            /** the vertical resolution of ribbon models, must be a positive integer; recommended 8 for hi, 6 for med, 3 for low */
            proteins_verticalResolution: Number
            /** the horizontal resolution of ribbon models, must be a positive odd integer; recommended 8 for hi, 5 for med, 3 for low */
            proteins_horizontalResolution: Number
            /** the ambient color for ribbons in 3D scenes */
            proteins_materialAmbientColor_3D: String
            /** the specular color for ribbons in 3D scenes */
            proteins_materialSpecularColor_3D: String
            /** the shininess of ribbons in 3D scenes */
            proteins_materialShininess_3D: Number
            /** render tubes and platforms for nucleic acids, if any */
            nucleics_display: Boolean
            /** the color of the tubes and base handles for the nucleic acid models */
            nucleics_tubeColor: String
            /** the color of the base platforms for the nucleic acid models */
            nucleics_baseColor: String
            /** color residues by segment when set; by default this is 'none', and residues will not be individually colored */
            nucleics_residueColor: 'none' | 'shapely' | 'rainbow'
            /** the thickness of the tubes that define the backbones of the nucleic acids */
            nucleics_tubeThickness: Number
            /** the resolution of the tube used for the backbones of nucleic acids in 3D scenes */
            nucleics_tubeResolution_3D: Number
            /** the vertical resolution of nucleic models, must be a positive integer; recommended 8 for hi, 6 for med, 3 for low */
            nucleics_verticalResolution: Number
            /** the ambient color for nucleic acid models in 3D scenes */
            nucleics_materialAmbientColor_3D: String
            /** the specular color for nucleic acid models in 3D scenes */
            nucleics_materialSpecularColor_3D: String
            /** the shininess of nucleic acid models in 3D scenes */
            nucleics_materialShininess_3D: Number
            /** render the atoms of the proteins and nucleic acids macromolecules, if any */
            macro_displayAtoms: Boolean
            /** render the bonds of the proteins and nucleic acids macromolecules, if any */
            macro_displayBonds: Boolean
            /** this is the cutoff distance that will determine the distance from ligand molecules that is required to show macromolecule atoms; if no ligands are present, or if there are no distances calculated, this specification will have no effect; the PDBInterpreter must be set to calculate distances; if this value is -1, then all atoms are shown regardless of distance */
            macro_atomToLigandDistance: Number
            /** render water molecules, if any */
            macro_showWater: Boolean
            /** color each individual chain with a unique color, overriding any other coloring specifications; colors are iterated in order, through HSL space */
            macro_colorByChain: Boolean
            /** the colors to interpolate through for the rainbow */
            macro_rainbowColors: String[]


            //Surface Specifications

            /** render surfaces, if any */
            surfaces_display: Boolean
            /** the transparency of surfaces in 3D scenes; a value between 0 and 1, with 0 being invisible and 1 being opaque */
            surfaces_alpha: Number
            /** the surface rendering style */
            surfaces_style: 'Dots' | 'Mesh' | 'Solid'
            /** the color of the surface */
            surfaces_color: String
            /** the ambient color for surfaces in 3D scenes */
            surfaces_materialAmbientColor_3D: String
            /** the specular color for surfaces in 3D scenes */
            surfaces_materialSpecularColor_3D: String
            /** the shininess of surfaces in 3D scenes */
            surfaces_materialShininess_3D: Number


            //Spectrum Specifications

            /** plot color */
            plots_color: String
            /** width of the plot line */
            plots_width: Number
            /** display an integration line, typically for NMR spectra */
            plots_showIntegration: Boolean
            /** integration line color */
            plots_integrationColor: String
            /** width of the integration line */
            plots_integrationLineWidth: Number
            /** display an grid using the axes' ticks */
            plots_showGrid: Boolean
            /** integration line color */
            plots_gridColor: String
            /** width of the integration line */
            plots_gridLineWidth: Number
            /** display the y-axis */
            plots_showYAxis: Boolean
            /** flip the x-axis, typical for certain domain units of NMR and IR spectra */
            plots_flipXAxis: Boolean


            //Shape Specifications

            /** shape text font size */
            text_font_size: Number
            /** the shape text font families, families cascade through the array if not found on the users computer */
            text_font_families: String[]
            /** shape text will be bold */
            text_font_bold: Boolean
            /** shape text will be italic */
            text_font_italic: Boolean
            /** this specification determines whether labels in WebGL scenes will have a black stroke behind them to improve contrast in complex graphics */
            text_font_stroke_3D: Boolean
            /** shape text color */
            text_color: String
            /** shape color */
            shapes_color: String
            /** shape line width */
            shapes_lineWidth: Number
            /** shape point size, typically for 3D rendering (as in surface dot representations) */
            shapes_pointSize: Number
            /** length of any associated arrows */
            shapes_arrowLength_2D: Number
            /** this specification determines whether the compass is displayed at the bottom-left of WebGL scenes */
            compass_display: Boolean
            /** compass X arrow color */
            compass_axisXColor_3D: String
            /** compass Y arrow color */
            compass_axisYColor_3D: String
            /** compass Z arrow color */
            compass_axisZColor_3D: String
            /** The size of the compass */
            compass_size_3D: Number
            /** The resolution of the compass */
            compass_resolution_3D: Number
            /** If true, the compass will display labels for the axes (X,Y,Z) */
            compass_displayText_3D: Boolean
            /** the type of compass to be rendered:
             * 0 - bottom left mesh;
             * 1 - center lined strokes
             */
            compass_type_3D: 0 | 1
            /** Set this to true to have measurements update on repaint, for dynamic scenes; leave it false for static scenes to improve performance */
            measurement_update_3D: Boolean
            /** The resolution of the angle arcs for measurements */
            measurement_angleBands_3D: Number
            /** If true, text will display the measurement values */
            measurement_displayText_3D: Boolean

            /** create a copy of this Styles object */
            copy(): void

            /** 
             * presets the 3D representation for the main molecular structure for a Canvas3D,
             * currently accepts: 'Ball and Stick', 'van der Waals Spheres', 'Stick', 'Wireframe', 'Line'
             */
            set3DRepresentation(representation: 'Ball and Stick' | 'van der Waals Spheres' | 'Stick' | 'Wireframe' | 'Line'): void
        }

        /**
         * represents a 2D point and contains functions for various 2D geometric calculations
         */
        class Point {
            /** x coordinate */
            x: number
            /** y coordinate */
            y: number

            /** add Point p */
            add(p: Point): void

            /** returns the angle to Point p, with the current Point as the origin (y-axis is inverted for the inverted canvases) */
            angle(p: Point): number

            /** same as angle(), but for the contradictory way canvas arcs are handled */
            angleForStupidCanvasArcs(p: Point): number

            /** returns the distance to Point p */
            distance(p: Point): number

            /** subtract Point p */
            sub(p: Point): void
        }

        type QueryRangeVariable = { x: number, y: number }[]

        /** 
         * this data structure holds query information for chemical objects;
         * range type query variables are arrays filled with objects defining x and y parameters,
         * for a single value range parameter, only x is defined
         */
        class Query {
            constructor(type: number)
            /** specifies an atom query */
            static TYPE_ATOM: string
            /** specifies a bond query */
            static TYPE_BOND: string
            /** this stores the current value of the query as a String; caching improves rendering performance, make sure to reset the cache if you change the Query by setting it to the output of the toString() function */
            cache: String
            /** this array contains values for the element identity variable, including generics */
            elements: QueryRangeVariable
            /** this array contains values for the atom charge variable, which is a range variable */
            charge: QueryRangeVariable
            /** this hash variable defines the stereochemical configuration of the atom */
            chirality: 'A' | 'R' | 'S'
            /** this array contains values for the atom connectivity variable (all connections including hydrogen), which is a range variable */
            connectivity: QueryRangeVariable
            /** this array contains values for the atom connectivityNoH variable (all connections excluding hydrogen), which is a range variable */
            connectivityNoH: QueryRangeVariable
            /** this array contains values for the atom hydrogen count variable, which is a range variable */
            hydrogens: QueryRangeVariable | boolean
            /** this array contains values for the bond type identity variable, including generics */
            orders: QueryRangeVariable
            /** this hash variable defines the stereochemical configuration of the bond */
            stereo: 'A' | 'E' | 'Z'
            /** this boolean variable defines whether an object is aromatic or not */
            aromatic: Boolean
            /** this array contains values for the object ring count variable, which is a range variable */
            ringCount: QueryRangeVariable
            /** this type specifies the query context; defined with the static members of this class */
            type: Number

            /** draws this query to the canvas that owns the Context using the given Styles at the input position */
            draw(ctx: CanvasRenderingContext2D, styles: Styles, pos: Point): void

            /** returns a string representing the input range objects */
            outputRange(range: QueryRangeVariable): String

            /** returns an array of range values corresponding to the input string value */
            parseRange(value: string): QueryRangeVariable

            /** returns a string representing this query in the ChemDoodle query notation format */
            toString(): String
        }

        /** represents a chemical atom */
        class Atom extends Point {
            constructor(label: string, x: number, y: number, z: number)
            /** specifies 'abs' (absolute) enhanced stereochemistry */
            static ESTEREO_ABSOLUTE: string
            /** specifies 'or' (or) enhanced stereochemistry */
            static ESTEREO_OR: string
            /** specifies '&' (and) enhanced stereochemistry */
            static ESTEREO_AND: string

            /** 
             * label of the atom, should be an element symbol;
             * this field is chemically significant and will be expected to be an element symbol
             */
            label: String
            /** 
             * alternate text to be displayed for an atom,which will override the rendering of the element symbol and any associated attributes;
             * this field is ignored if undefined
             */
            altLabel: String
            /** z coordinate */
            z: Number
            /** atomic charge */
            charge: Number
            /** mass number, values greater than -1 are rendered */
            mass: Number
            /** implicit hydrogen count override, this overrides the built in implicit hydrogen algorithm with the positive value (or 0) provided, values greater than -1 are rendered */
            implicitH: Number
            /** number of lone pairs to be rendered on an atom; this is a positive integer value */
            numLonePair: Number
            /** number of radical electrons to be rendered on an atom; this is a positive integer value */
            numRadical: Number
            /** not connected to any other atoms (if Carbon, draws a grey dot) */
            isLone: Boolean
            /** if true, this represents that the mouse is hovered, draws a brown circle */
            isHover: Boolean
            /** if true, this represents that this atom is selected, draws a blue circle */
            isSelected: Boolean
            /** for SketcherCanvas, overlaps another atom, draws a red circle */
            isOverlap: Boolean
            /** for SketcherCanvas, this atom is contained in the lasso */
            isLassoed: Boolean
            /** metadata set by the containing Molecule, states if the Atom is hidden (it is located between two parallel bonds, think allenes) */
            isHidden: Boolean
            /** metadata set by the containing Molecule, the valency of the Atom */
            coordinationNumber: Number
            /** metadata set by the containing Molecule, the number of bonds connected to the Atom */
            bondNumber: Number
            /** metadata set by the containing Molecule, the angle in radians that points towards the largest open space between the bonds connected to the atom */
            angleOfLeastInterference: Number
            /** metadata set by the containing Molecule, an Array of Number storing the bond angle information from this atom */
            angles: Number[]
            /** set this to true to not draw this atom, this is used by the sketcher to hide the label when using the text input tool */
            dontDraw: Boolean
            /** this object stores the query information for this atom; if it is undefined, then there is no query associated with this atom */
            query: Query
            /** metadata set by the containing Molecule, the center of the molecule that contains this atom */
            molCenter: Point
            /**
             * the enhanced stereochemistry definition for the atom;
             * this object has two parameters, 'type' and 'group'.
             * 'type' is a String and defines the enhanced stereochemistry operator, either 'abs', 'or', or '&', 'abs' by default.
             * 'group' is a positive integer defining the and/or operator group and is 1 by default.
             */
            enhancedStereo: { type: 'abs' | 'or' | '&', group: number }

            /** the 3D counterpart to the same Point function */
            add3D(a: Atom): void

            /** the 3D counterpart to the same Point function */
            distance3D(a: Atom): void

            /** draws this atom to the canvas that owns the Context using the given Styles */
            draw(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** draws attributes for an Atom */
            drawAttribute(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** draws decorations for the SketcherCanvas that owns the Context and has this Atom hovered */
            drawDecorations(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** returns a Bounds object containing the 2D bounds of the graphical atom */
            getBounds(): math.Bounds

            /** returns a Bounds object containing the 3D bounds of the graphical atom */
            getBounds3D(): math.Bounds

            /**
             * this is a helper function for the rendering functions; 
             * given the input choices, a color is returned with which to render the atom with
             */
            getElementColor(useJMOLColors: boolean, usePYMOLColors: boolean, color: string): String

            /** returns the number of implicit hydrogens */
            getImplicitHydrogenCount(): Number

            /** returns true if label is not 'C' */
            isLabelVisible(styles: Styles): Boolean

            /** 
             * renders this atom to the 3D scene in the WebGL canvas that owns the WebGLRenderingContext using the given Styles;
             * noColor is a parameter only used by the picking system
             */
            render(gl: WebGLRenderingContext, styles: Styles, noColor: boolean): void

            /** renders the highlight for this atom the given Styles */
            renderHighlight(gl: WebGLRenderingContext, styles: Styles): void

            /** the 3D counterpart to the same Point function */
            sub3D(a: Atom): void
        }

        /**
         * represents and renders advanced chemical labels, with correct tokenizing, formatting and layout.
         * (Proprietary Only)
         */
        class CondensedLabel extends Point {
            constructor(atom: Atom, text: string)

            /** a string array of the valid and acceptable abbreviations to be used along with element symbols when parsing labels. */
            static ABBREVIATIONS: string[]
            /** the atom that this condensed label is labelling. */
            atom: Atom
            /** the text of the label to be parsed. */
            text: String
            /** a string array of the parsed tokens of the label. */
            tokens: string[]

            /** draws this condensed label to the canvas that owns the Context using the given Styles */
            draw(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** reverses the order of the tokens if necessary for layout */
            getLeftAlignedTokens(ctx: CanvasRenderingContext2D, styles: Styles): string[]

            /** this algorithm parses the label */
            parse(): void
        }

        /** represents a chemical ring */
        class Ring {
            constructor()

            /** constituent atoms */
            atoms: Atom[]
            /** constituent bonds */
            bonds: Bond[]
            /** the center of this Ring, cached for performance */
            center: Point

            /** returns a Point that specifies the center of this Ring */
            getCenter(): Point

            /** loops through bonds and sets all Bond.ring objects in to itself, caches center */
            setupBonds(p: Point): void
        }

        /** represents a chemical bond */
        class Bond {
            /** specifies no stereochemistry */
            STEREO_NONE: String
            /** specifies a protruding stereochemistry */
            STEREO_PROTRUDING: String
            /** specifies a recessed stereochemistry */
            STEREO_RECESSED: String
            /** specifies an ambiguous stereochemistry */
            STEREO_AMBIGUOUS: String
            /** first Atom */
            a1: Atom
            /** second Atom */
            a2: Atom
            /** bond order */
            bondOrder: Number
            /** this object stores the query information for this bond; if it is undefined, then there is no query associated with this bond */
            query: Query
            /** stereochemical bias of the bond, must be one of the BOND_STEREO constants */
            stereo: String
            /** if true, this represents that this bond is selected, draws brown handles */
            isHover: Boolean
            /** if true, this represents that this atom is selected, draws blue handles */
            isSelected: Boolean
            /** the largest containing SSSR ring */
            ring: Ring
            /** metadata set by the containing Molecule, the center of the molecule that contains this bond */
            molCenter: Point

            /** returns true if this Bond connects to the input atom */
            contains(a: Atom): Boolean

            /** draws this bond to the canvas that owns the Context using the given Styles */
            draw(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** draws decorations for the SketcherCanvas that owns the Context and has this Bond hovered */
            drawDecorations(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** draws this bond in Lewis Dot style given the input parameters */
            drawLewisStyle(ctx: CanvasRenderingContext2D, styles: Styles, y1: Number, x2: Number, x1: Number, y2: Number): void

            /** returns a Point that specifies the center between the two Atoms in the Bond */
            getCenter(): Point

            /** returns the bond length on the XY plane */
            getLength(): Number

            /** returns the 3D bond length */
            getLength3D(): Number

            /** returns the Atom opposite Atom a */
            getNeighbor(a: Atom): Atom

            /** renders this bond to the 3D scene in the WebGL canvas that owns the WebGLRenderingContext using the given Styles */
            render(gl: WebGLRenderingContext, styles: Styles): void

            /** renders the highlight for this bond the given Styles */
            renderHighlight(gl: WebGLRenderingContext, styles: Styles): void

            /** this function renders the bond for the picking system */
            renderPicker(gl: WebGLRenderingContext, styles: Styles): void
        }

        /** represents a chemical molecule */
        class Molecule {
            constructor()

            /** constituent atoms */
            atoms: Atom[]

            /** constituent bonds */
            bonds: Bond[]

            /** constituent rings */
            rings: Ring[]

            /** 
             * will find rings in the check() function;
             * this should be disabled by you, if not necessary, to improve performance
             */
            findRings: boolean

            /** 
             * sets up the molecule for drawing by checking for lone carbons, rings and z-sorting, as well as setting up the metadata for drawing;
             * since this is a cpu intensive function, the force parameter is for efficiency,
             * so the molecule can be checked often, with a false or no parameter and it will keep track that it needs to be checked,
             * then when an important function (such as a render) needs the check to go through,
             * you pass it a true and the check will be forced if the molecule needs to be checked.
             */
            check(force: boolean): void

            /** draws this molecule to the canvas that owns the Context using the given Styles */
            draw(ctx: CanvasRenderingContext2D, styles: Styles): void

            /** with a as the origin, returns an Array of all the angles to the immediately connected atoms in this Molecule, in ascending order */
            getAngles(a: Atom): number[]

            /** Given an input atom from this molecule, return the group it is enclosed within, either ring block or chain */
            getAtomGroup(atom: Atom): Atom[]

            /** calculates the average bond length of the molecule, or returns 0 if there are no bonds, this is a 2D function */
            getAverageBondLength(): number

            /** Given an input bond from this molecule, return the group it is enclosed within, either ring block or chain */
            getBondGroup(bond: Bond): Bond[]

            /** returns an Array of Bond objects that contain the input Atom a in the molecule */
            getBonds(a: Atom): Bond[]

            /** returns a Bounds object containing the 2D bounds of the graphical molecule */
            getBounds(): math.Bounds

            /** returns a Bounds object containing the 3D bounds of the graphical molecule */
            getBounds3D(): math.Bounds

            /** returns a Point that specifies the center of this Molecule */
            getCenter(): Point

            /** returns an Atom that specifies the center of this Molecule in 3 dimensions */
            getCenter3D(): Atom

            /** adds the bond orders from the bs (Array of Bond) parameter together to calculate the coordination number */
            getCoordinationNumber(bs: Bond[]): number

            /** 
             * returns a Point that specifies the width and height of this Molecule in the XY plane.
             * Among other uses, this method can be used to first find the dimensions of a molecule 
             * to set the dimensions of a Canvas to perfectly fit it (make sure to add some aesthetic buffer space).
             */
            getDimension(): Point

            /** renders this molecule to the 3D scene in the WebGL canvas that owns the WebGLRenderingContext using the given Styles */
            render(gl: WebGLRenderingContext, styles: Styles): void

            /** 
             * renders the picking scene to the backbuffer for analysis;
             * objects is an indexed array that stores the object information for the primitive geometries;
             * includeAtoms and includeBonds determine if these objects will be selectable
             */
            renderPickFrame(gl: WebGLRenderingContext, styles: Styles, objects: unknown[], includeAtoms: boolean, includeBonds: boolean): void

            /** scales the molecule so that the average bond length equals the input length, this is a 2D function */
            scaleToAverageBondLength(length: number): void

            /** sets up metadata for the molecule, used internally to determine how graphics are rendered */
            setupMetaData(): void

            /** sorts atoms in ascending order by z coordinate */
            sortAtomsByZ(): void

            /** sorts bonds in ascending order by their z coordinate */
            sortBondsByZ(): void
        }

        /** data structure to hold spectrum information */
        class Spectrum {
            constructor()

            /** the spectrum plot as an array of Point objects */
            data: Point[]
            /** this is an Array of String containing the header records from the JCAMP file */
            metadata: string[]
            /** 
             * this is an Array of Object.
             * Each object describes an item in the list of data items to be displayed on the top left of the spectrum.
             * Three String parameters may be present: tag, display, value.
             * If tag is present, then the JCAMP metadata will be searched for the corresponding JCAMP tag and placed in the list.
             * If this tag is not found, it is ignored.
             * If display is also provided, then the JCAMP tag name is replaced by the more appropriate title.
             * You can also add custom items by providing the display and value parameters.
             * If the value parameter is defined, then the tag parameter will be ignored if also defined.
             */
            dataDisplay: { tag?: string, display?: string, value?: string }[]
            /** the minimum domain value, set up by the setup method to the smallest x value in the data array after the spectrum is read, can also be manually set */
            minX: Number
            /** the maximum domain value, set up by the setup method to the largest x value in the data array after the spectrum is read, can also be manually set */
            maxX: Number
            /** this value states that only values greater than this percentage of the highest y-value in the spectrum will be considered in the integration */
            integrationSensitivity: Number
            /** the title of the spectrum, most spectrum file formats provide a title, no title is displayed if the value is undefined */
            title: String
            /** the unit of the domain to be displayed under the x-axis, no x-axis title is displayed if the value is undefined */
            xUnit: String
            /** the unit of the domain to be displayed under the y-axis, no y-axis title is displayed if the value is undefined */
            yUnit: String
            /**
             * determines how the plot will be drawn,
             * if continuous is true, then the plot is rendered as a path from Point to Point in the data array,
             * if continuous is false, then each data point will be rendered as a vertical line from y = 0
             */
            continuous: Boolean
            /** an object storing dimension metadata from the previous render */
            memory: Object

            /** will popup a Javascript alert dialog with the metadata from the JCAMP file */
            alertMetadata(): void

            /** draws this spectrum and graph to the canvas that owns the Context using the given Styles, the canvas's width and height are also provided */
            draw(ctx: CanvasRenderingContext2D, styles: Styles, width: Number, height: Number): void

            /** draws the spectrum plot to the canvas that owns the Context using the given Styles, the canvas's width and height, and the offsets from the top, bottom, and left are also provided */
            drawPlot(ctx: CanvasRenderingContext2D, styles: Styles, width: Number, height: Number, offsetTop: Number, offsetLeft: Number, offsetBottom: Number): void

            /**
             * given the input x-coordinate from the canvas space,
             * this function will return a point containing the plot coordinates of the spectrum point that has its x-coordinate closest to the input x coordinate;
             * because the smallest resolution on screens is a pixel, this function will actually find the highest peak within a pixel range of the input x coordinate to return;
             * can only be called after a render when memory is set, this function doesn't make sense without a render first anyway
             */
            getClosestPlotInternalCoordinates(x: Number): Point

            /** 
             * function to obtain the x and y coordinates within the spectrum's plot space given the input x and y coordinates from the canvas space;
             * can only be called after a render when memory is set, this function doesn't make sense without a render first anyway;
             * essentially, this just calls getInverseTransformedX() and getInverseTransformedY()
             */
            getInternalCoordinates(x: Number, y: Number): Point

            /**
             * function to obtain the x-coordinate within the spectrum's plot space given the input x-coordinate from the canvas space;
             * can only be called after a render when memory is set, this function doesn't make sense without a render first anyway
             */
            getInverseTransformedX(x: Number): Number

            /**
             * function to obtain the y-coordinate within the spectrum's plot space given the input y-coordinate from the canvas space;
             * can only be called after a render when memory is set, this function doesn't make sense without a render first anyway
             */
            getInverseTransformedY(y: Number): Number

            /** used internally to obtain the x-coordinate within the canvas space given the input x-coordinate from the spectrum's plot space */
            getTransformedX(x: Number, styles: Styles, width: Number, offsetLeft: Number): Number

            /** used internally to obtain the y-coordinate within the canvas space given the input y-coordinate from the spectrum's plot space */
            getTransformedY(x: Number, styles: Styles, height: Number, offsetBottom: Number, offsetTop: Number): Number

            /** analyzes the data array for the default domain and scales the range between 0 and 1, called by the interpreters that read spectra files */
            setup(): void

            /**
             * given the signed translation amount in pixels in the canvas's domain space (in any order),
             * will translate that domain by appropriately setting the minX and maxX parameters given the canvas width
             */
            translate(dif: Number, width: Number): void

            /**
             * given the input pixel1 and pixel2 values in the canvas's domain space (in any order),
             * will focus in on that domain by appropriately setting the minX and maxX parameters given the canvas width;
             * optionally, if the scaleY parameter is true, this function will return a that: Number should be the new scale for the Styles.scale value to see the full peak;
             * this function returns nothing if scaleY is false
             */
            zoom(pixel1: Number, pixel2: Number, width: Number, scaleY: boolean): Number
        }

        /** represents a chemical reaction */
        class Reaction {
            constructor()

            /**
             * given a reaction arrow and an array of molecules, this function will separate the molecules into reactants and products.
             * An object is returned with two subarrays named "reactants" and "products"
             */
            resolve(arrow: d2.Line, molecules: Molecule[]): { reactants: Molecule[], products: Molecule[] }
        }

        /** a queue data structure */
        class Queue {
            constructor()

            /** returns and removes the element at the beginning of the queue */
            dequeue(): Object

            /** adds an element to the end of the queue */
            enqueue(o: Object): Object

            /** returns, but does not remove, the element at the beginning of the queue */
            getOldestElement(): Object

            /** returns the size of the queue */
            getSize(): Number

            /** returns true if there are no elements in the queue */
            isEmpty(): Boolean
        }

        module d2 {
            /** the parent data structure for all 2D shapes, it should not be instantiated. */
            class _Shape {
                /** draws this shape's anchor to the SketcherCanvas that owns the Context using the given Styles and mouse position */
                drawAnchor(ctx: CanvasRenderingContext2D, styles: Styles, p: Point, hovered: boolean): void

                /** draws this shape's decorations to the SketcherCanvas that owns the Context using the given Styles */
                drawDecorations(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns a Bounds object containing the 2D bounds of the shape */
                getBounds(): math.Bounds
            }

            /** represents a 2D line, arrows can be attached */
            class Line {
                constructor(p1: Point, p2: Point)

                /** specifies a synthetic arrow */
                ARROW_SYNTHETIC: String
                /** specifies a retrosynthetic arrow */
                ARROW_RETROSYNTHETIC: String
                /** specifies a resonance arrow */
                ARROW_RESONANCE: String
                /** specifies an equilibrium arrow */
                ARROW_EQUILIBRIUM: String

                /**
                 * the arrow type the line is to be rendered as;
                 * if undefined, the line is rendered as a plain line
                 */
                arrowType: String
                /** 
                 * the text to be rendered above the arrow (conditions, etc.);
                 * if undefined, no text is rendered above the arrow
                 */
                topText: String
                /** the text to be rendered below the arrow; if undefined, no text is rendered below the arrow */
                bottomText: String
                /** this array contains one representative atom from each molecule assigned as a reactant to this line shape, typically when representing a reaction as an arrow */
                reactants: Atom[]
                /** this array contains one representative atom from each molecule assigned as a product to this line shape, typically when representing a reaction as an arrow */
                products: Atom[]
                /** the set of coordinates that represent the start of the line */
                p1: Point
                /** the set of coordinates that represent the end of the line */
                p2: Point

                /** draws this line to the canvas that owns the Context using the given Styles */
                draw(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns an Array of Point objects that contains p1 and p2 */
                getPoints(): Point[]

                /** returns true if the input point is above the shape */
                isOver(p: Point, barrier: number): boolean
            }

            /** represents electron movement, draws a bezier curve between the chemical objects involved with the transfer */
            class Pusher {
                constructor(o1: Object, o2: Object, numElectron: number)

                /** 
                 * the number of electrons being pushed;
                 * if the number is -1, this is a bond forming pusher
                 */
                numElectron: number
                /** the chemical object (atom or bond) that the electron(s) are coming from */
                o1: Object
                /** the chemical object (atom or bond) that the electron(s) are moving to */
                o2: Object

                /** draws this pusher to the canvas that owns the Context using the given Styles */
                draw(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** draws this pusher's decorations in the sketcher if it is hovered */
                drawDecorations(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns an empty Array */
                getPoints(): []

                /** returns true if the input point is above the shape */
                isOver(p: Point, barrier: number): boolean
            }

            /** this shape stores an atom mapping pair, usually used for advanced reaction searches */
            class AtomMapping {
                constructor(o1: Atom, o2: Atom)

                /** the label that is displayed for this atom mapping pair, this value is automatically set by the SketcherCanvas class before repaint */
                label: String
                /** if true, this atom mapping will be rendered in the Styles.colorError color */
                error: Boolean
                /** the first atom of the mapping */
                o1: Atom
                /** the second atom of the mapping */
                o2: Atom

                /** draws this atom mapping to the canvas that owns the Context using the given Styles */
                draw(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns an array with the points corresponding to the locations that the atom mappings are rendered at */
                getPoints(): Point[]

                /** returns true if the input point is above the shape */
                isOver(p: Point, barrier: number): boolean
            }

            /** represents a 2D bracket with a charge, multiplicity, repeat or mix */
            class Bracket {
                constructor(p1: Point, p2: Point)

                /** an Integer describing the charge amount associated with this bracket; this number is rendered at the top-right of the bracket */
                charge: Number
                /** an Integer describing the multiple associated with this bracket, useful for reaction schemes; this number is rendered at the left center of the bracket */
                mult: Number
                /** an Integer describing the repeat count associated with this bracket, useful for polymers; this number is rendered at the bottom-right of the bracket */
                repeat: Number
                /** the set of coordinates that represent the start of the bracket */
                p1: Point
                /** the set of coordinates that represent the end of the bracket (opposite corner from the start) */
                p2: Point

                /** draws this bracket mapping to the canvas that owns the Context using the given Styles */
                draw(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns an Array of Point objects that contains p1 and p2 */
                getPoints(): Point[]

                /** returns true if the input point is above the shape */
                isOver(p: Point, barrier: number): boolean
            }

            /** represents a repeat group with a repeat range */
            class RepeatUnit {
                constructor(b1: Point, b2: Point)

                /** Repeat units in rings (where each of the end bonds is a member of one and only one ring each and they are both members of the same ring) can contain one of two subsets of atoms. This is controlled by the “flip” parameter of the RepeatUnit. By default, the contents of the repeat unit will contain the first atom of the first bond (b1.a1). If flipped, the contents of the repeat unit will contain the second atom of the first bond (b1.a2). */
                flip: Boolean
                /** an Integer describing the first magnitude of the repeat range */
                n1: Number
                /** an Integer describing the second magnitude of the repeat range */
                n2: Number
                /** an array of Atoms collecting all of the atoms covered by this repeat unit; this must be set accordingly by the RepeatUnit.setContents() function, which may be overridden */
                contents: Atom[]
                /** an array of Point containing the four corner points of the bracket ends; is only set after it is first drawn */
                ps: Point[]
                /** the bond that specifies the start position of the repeating group */
                b1: Bond
                /** the bond that specifies the end position of the repeating group */
                b2: Bond

                /** draws this repeat unit to the canvas that owns the Context using the given Styles */
                draw(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** draws this repeat unit's decorations in the sketcher if it is hovered */
                drawDecorations(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns an Array of Point objects corresponding to the four corners of the drawn bracket ends */
                getPoints(): Point[]

                /** returns false */
                isOver(p: Point, barrier: number): boolean

                /** 
                 * called before drawing if necessary;
                 * this function resolves the contents of the repeat units and sets it to the contents variable of the instance
                 */
                setContents(sketcher: SketcherCanvas): void
            }

            /** represents a variable attachment point with a subtituent and attachments; the x and y constructor parameters are used for the location of the asterisk */
            class VAP {
                constructor(x: number, y: number)

                /** the location of the asterisk that represents this variable attachment point */
                asterisk: Atom
                /** the substituent attached to this variable attachment point */
                substituent: Atom
                /** the bond type of the substituent bond from the variable attachment point to the substituent; same bond types as used for the Bond class */
                bondType: Number
                /** an array of Atoms collecting all of the atoms this variable attachment point is connected to, excluding the substituent */
                attachments: Atom[]

                /** draws this variable attachment point to the canvas that owns the Context using the given Styles */
                draw(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** draws this variable attachment point's decorations in the sketcher if it is hovered */
                drawDecorations(ctx: CanvasRenderingContext2D, styles: Styles): void

                /** returns an Array of Point objects corresponding to the four corners of the drawn bracket ends */
                getPoints(): Point[]

                /** returns false */
                isOver(p: Point, barrier: number): boolean
            }
        }

        module d3 {
            /** parent class for all 3D shapes, it should not be instantiated. */
            abstract class _Mesh {
                /** an array of floating point values that describe the position of verticies in a mesh. */
                positionData: number[]
                /** an array of floating point values that describe the surface normals */
                normalData: number[]
                /** an array of integer values that indexes the triplets contained within the positionData and normalData arrays */
                indexData: number[]

                /** binds the vertex buffers to the given WebGL context; calls setupBuffers if buffers have not been already set up. */
                bindBuffers(gl: WebGLRenderingContext): void

                /** given a WebGL context and vertex buffer data, returns an array containing the position, normal, and index buffers. */
                generateBuffers(gl: WebGLRenderingContext, normalData: number[], indexData: number[]): void

                /** sets up vertex buffers for a given WebGL context prior to rendering. */
                setupBuffers(gl: WebGLRenderingContext): void

                /** stores position, normal, and index vertex buffer data for later use by other methods. */
                storeData(positionData: Number[], normalData: number[], indexData: number[]): void
            }

            /** parent class for all 3D measurements, it should not be instantiated. */
            abstract class _Measurement extends _Mesh {
                /** renders the measurement to the given WebGL context according to the provided visual specifications */
                render(gl: WebGLRenderingContext, styles: Styles): void

                /** renders the text associated with the measurement to the given WebGL context according to the provided visual specifications */
                renderText(gl: WebGLRenderingContext, styles: Styles): void

                /** abstract method for measuring the desired quantity and generating rendering data for use in a 3D canvas. */
                abstract calculateData(styles: Styles): void

                /** abstract method for returning an object with the position and value the measurement for rendering as text in a 3D canvas */
                abstract getText(styles: Styles): Object
            }

            /** parent class for all 3D surfaces, it should not be instantiated. */
            abstract class _Surface extends _Mesh {
                /** generate and build the 3D surface, using marching cubes, including simplifying the mesh, smoothing and normal generation; this function is dependent on the input atoms, probeRadius and resolution */
                build(atoms: Atom[], probeRadius: Number, resolution: Number): void

                /** this is the algorithm that generates the isosurface so that the surface can be built */
                generate(xdif: Number, ydif: Number, zdif: Number, step: Number, range: Number, xsteps: Number, ysteps: Number, zsteps: Number): void

                /** renders the surface to the given WebGL context according to the provided visual specifications */
                render(gl: WebGLRenderingContext, styles: Styles): void

                /** calculate the isosurface value for the surface given the x, y and z coordinates; this is an abstract function to be implemented by child Surfaces. */
                abstract calculate(x: Number, y: Number, z: Number): void
            }

            /** a child of the _Measurement class, represents the angle between three atoms */
            class Angle extends _Measurement {
                constructor(a1: Atom, a2: Atom, a3: Atom)

                /** first of three atoms that form the angle. */
                a1: Atom
                /** second of three atoms that form the angle. */
                a2: Atom
                /** third of three atoms that form the angle. */
                a3: Atom
                /** vector from a1 to a2, computed by calculateData */
                vec1: vec3
                /** vector from a2 to a3, computed by calculateData */
                vec2: vec3
                /** angle formed by vec1 and vec2, computed by calculateData */
                angle: Number

                /** calculates the angle between the three atoms and creates the required data to render the angle in a 3D canvas. */
                calculateData(styles: Styles): void

                /** returns an object with the position and value of the angle for rendering as text in a 3D canvas */
                getText(styles: Styles): Object
            }

            /** a child of the _Mesh class, represents a cylindrical arrow with head */
            class Arrow extends _Mesh {
                constructor(radius: number, bands: number)
            }

            /** a child of the _Mesh class, represents a 3D rectangular prism, or box */
            class Box extends _Mesh {
                constructor(width: number, height: number, depth: number)
            }

            /** helper object keep track of the projection and view matrixes from the camera into the scene */
            class Camera {
                /** field of view angle for the perspective projection */
                fieldOfView: Number
                /** aspect ration for the projection */
                aspect: Number
                /** near clip value for the projection */
                near: Number
                /** far clip value for the projection */
                far: Number
                /** the zoom value into the scene for the projection */
                zoom: Number
                /** the matrix for the model view */
                viewMatrix: mat4
                /** the matrix for the projection */
                projectionMatrix: mat4

                /** returns the calculated focal length */
                focalLength(): Number

                /** returns the orthogonal projection matrix given the camera's values, updating the internal matrix */
                orthogonalProjectionMatrix(): mat4

                /** returns the perspective projection matrix given the camera's values, updating the internal matrix */
                perspectiveProjectionMatrix(): mat4

                /** returns and recalculates the internal projection matrix, either perspective or orthogonal, given the parameter */
                updateProjectionMatrix(isProjection: Boolean): mat4

                /** zooms in the camera view */
                zoomIn(): void

                /** zooms out the camera view */
                zoomOut(): void
            }

            /** helper object to render the compass */
            class Compass {
                constructor(gl: WebGLRenderingContext, styles: Styles)

                /** renders the compass to the given WebGL context according to the provided visual specifications */
                render(gl: WebGLRenderingContext, styles: Styles): void

                /** renders an individual arrow */
                renderArrow(gl: WebGLRenderingContext, color: String, mvMatrix: number[]): void
            }

            /** a child of the _Mesh class, represents a 3D cylinder */
            class Cylinder extends _Mesh {
                constructor(radius: Number, height: Number, bands: Number, closed: Boolean)
            }

            /** a class for supporting a frame buffer object (FBO), with knowledge of depth buffer capabilities of the given WebGL context */
            class FrameBuffer {
                constructor()

                /** sets the size of the FBO buffer with both width and height being set to the input parameter and then binds it to the context */
                bind(gl: WebGLRenderingContext, width: Number, height: Number): void

                /** initializes the FBO */
                init(gl: WebGLRenderingContext): void

                /** set color texture */
                setColorRenderBuffer(gl: WebGLRenderingContext, renderbuffer: Number, attachment: Number): void

                /** set color texture */
                setColorTexture(gl: WebGLRenderingContext, texture: Number, attachment: Number): void

                /** set color texture */
                setDepthRenderBuffer(gl: WebGLRenderingContext, renderbuffer: Number): void

                /** set color texture */
                setDepthTexture(gl: WebGLRenderingContext, texture: Number): void
            }

            /** a class for defining textures */
            class Texture {
                constructor()

                /** initializes the texture */
                init(gl: WebGLRenderingContext, type: Number, internalFormat: Number, format: Number): void

                /** sets the size of the texture with both width and height being set to the input parameter and then binds it to the context */
                setParameter(gl: WebGLRenderingContext, width: Number, height: Number): void
            }

            /** a class representing the render buffer */
            class Renderbuffer {
                constructor()

                /** initializes the render buffer */
                init(gl: WebGLRenderingContext, type: Number, internalFormat: Number, format: Number): void

                /** sets the size of the render buffer with both width and height being set to the input parameter and then binds it to the context */
                setParameter(gl: WebGLRenderingContext, width: Number, height: Number): void
            }

            /** a class controlling Screen Space Ambient Occlusion (SSAO) features */
            class SSAO {
                constructor()

                /** binds the SSAO noise texture to the context */
                initNoiseTexture(gl: WebGLRenderingContext): void

                /** initializes the sample kernel */
                initSampleKernel(kernelSize: Number): void
            }

            /** a child of the _Measurement class, represents the distance between two atoms */
            class Distance extends _Measurement {
                constructor(a1: Atom, a2: Atom, node: vec3, offset: Number)

                /** first of the two atoms whose distance is being measured. */
                a1: Atom
                /** second of the two atoms whose distance is being measured. */
                a2: Atom
                /** an optional vector that displaces the measured vector from the midpoint of the two atoms */
                node: vec3
                /** an optional distance to offset the measurement text */
                offset: Number

                /** calculates the distance between the two atoms and creates the required data to render the distance in a 3D canvas. */
                calculateData(styles: Styles): void

                /** returns an object with the position and value of the distance for rendering as text in a 3D canvas */
                getText(styles: Styles): Object
            }

            /** handles fogging for WebGL canvases. */
            class Fog {
                constructor(fog: String, fogStart: Number, fogEnd: Number, density: Number)
                /** the color of the fog, stored as an array of representing the RGB values. */
                colorRGB: Number[]
                /** number value that the fog starts from. Choose a value between 0 and 1, and this value should be less than fogEnd. */
                fogStart: Number
                /** number value that the fog ends at. Choose a value between 0 and 1, and this value should be greater than fogStart. */
                fogEnd: Number
                /** the density of the fog for exp1 and exp2 algorithms. */
                density: Number

                /** sets up the values for the fogging algorithm. */
		        fogScene(color: String, fogStart: Number, fogEnd: Number, density: Number): void
            }

            /** a child of the _Mesh class, represents a line */
            class Line extends _Mesh {
                constructor()
            }

            /** a child of the _Mesh class, represents a quad */
            class Quad extends _Mesh {
                constructor()
            }

            /** a child of the _Mesh class, represents a 3D pill geometry */
            class Pill extends _Mesh {
                constructor(radius: Number, height: Number, latitudeBands: Number, longitudeBands: Number)
            }

            /** a child of the _Mesh class, represents a ribbon typically used in protein renderings */
            class Ribbon extends _Mesh {
                constructor(chain: any[], offset: Number, cartoon: Boolean)

                /** an array of sub-meshes that make up the ribbon */
                paritions: _Mesh[]
                /** an array of sub-meshes that make up residues in the ribbon. */
                segments: _Mesh[]
                /** an array of sub-meshes that make up cartoonized residues in the ribbon. */
                cartoonSegments: _Mesh[]
                /** keeps track of last partition rendered */
                "partitions.lastRender": Number
                /** indicates whether the front or the back of the ribbon is visible. */
                front: Boolean

                /** renders the ribbon to the given WebGL context according to the provided visual specifications */
		        render(gl: WebGLRenderingContext, styles: Styles): void

                /** overrides the storeData function of the Mesh class to pull vertex data from the first member of the partition array; clears the partition array to save memory if there is only one partition. */
		        storeData(positionData: Number[], normalData: Number[], indexData: Number[]): void
            }

            /** a child of the _Mesh class, represents a shape described by a set of points in the xy plane and a thickness in the z plane. */
            class Shape extends _Mesh {
                constructor(points: Point[], thickness: Number)
            }

            /** a child of the _Surface class, this surface defines a solvent accessible surface. */
            class SASSurface extends _Surface {
                constructor(atoms: Atom[], probeRadius: Number, resolution: Number)

                /** the array of Atom objects this surface is based on */
                atoms: Atom[]
                /** this is the number of divisions the smallest side of the rectangular prism that encompases the isosurface is divided into, a value of 30 is typically acceptable */
                resolution: Number
                /** the radius of the probe used to define the surface */
                probeRadius: Number

                /** calculate the isosurface value for the surface given the x, y and z coordinates; this is an abstract function to be implemented by child Surfaces. */
                calculate(x: Number, y: Number, z: Number): void
            }

            /** a child of the _Surface class, this surface defines a solvent excluded (also known as Connolly) surface. (Proprietary Only) */
            class SESSurface extends _Surface {
                constructor(atoms: Atom[], probeRadius: Number, resolution: Number)

                /** the array of Atom objects this surface is based on */
                atoms: Atom[]
                /** this is the number of divisions the smallest side of the rectangular prism that encompases the isosurface is divided into, a value of 30 is typically acceptable */
                resolution: Number
                /** the radius of the probe used to define the surface */
                probeRadius: Number

                /** calculate the isosurface value for the surface given the x, y and z coordinates; this is an abstract function to be implemented by child Surfaces. */
                calculate(x: Number, y: Number, z: Number): void
            }

            /** a child of the _Mesh class, respresents a sphere with a given radius and number of latitude and longitude bands. */
            class Sphere extends _Mesh {
                constructor(radius: Number, latitudeBands: Number, longitudeBands: Number)
            }

            /** a child of the _Mesh class, represents a small star (mainly used to depict solvent in macromolecule renderings). */
            class Star extends _Mesh {
                constructor()
            }

            /** a child of the _Mesh class, represents a tube of the sort typically used in macromolecular backbone renderings. */
            class Tube extends _Mesh {
                constructor(chain: any[], thickness: Number, cylinderResolution: Number)

                /** cylindrical meshes that make */
                paritions: Cylinder[]
                /** sphere meshes at the end of the each tube. */
                ends: Sphere[]

                /** renders the tube to the given WebGL context according to the provided visual specifications */
		        render(gl: WebGLRenderingContext, styles: Styles): void
            }

            /** a child of the _Mesh class, represents a crystallographic unit cell rendered from a set of vectors. */
            class UnitCell extends _Mesh {
                /**
                 * @param lengths this is an array of length 3, with the length values of the unit cell for a, b, and c in that order. Unit: Angstroms
                 * @param angles this is an array of length 3, with the angle values of the unit cell for alpha, beta, and gamma in that order. Unit: radians
                 * @param offset this is an array of length 3, with the ABC offset values of the unit cell for A, B and C in that order; these offset values are in internal coordinate space; if not provided, the default offset will be [0, 0, 0] to start the unit cell at the origin. Unit: ABC Internal Coordinates
                 */
                constructor(lengths: Number[], angles: Number[], offset: Number[])

                /** renders the unit cell to the given WebGL context according to the provided visual specifications */
		        render(gl: WebGLRenderingContext, styles: Styles): void
            }

            /** a child of the _Surface class, this surface defines a van der Waals surface. */
            class VDWSurface extends _Surface {
                constructor(atoms: Atom[], resolution: Number)

                /** the array of Atom objects this surface is based on */
                atoms: Atom[]
                /** this is the number of divisions the smallest side of the rectangular prism that encompases the isosurface is divided into, a value of 30 is typically acceptable */
                resolution: Number
                /** the radius of the probe used to define the surface, vdW surfaces are not dependent on a probe, and this value has no effect on the VDWSurface class */
                probeRadius: Number

                /** calculate the isosurface value for the surface given the x, y and z coordinates; this is an abstract function to be implemented by child Surfaces. */
                calculate(x: Number, y: Number, z: Number): void;
            }

            /** represents a light source with given RGB specular and diffuse colors, as well as a vector describing the direction it is shining in. */
            class Light {
                constructor(specularColor: String, diffuseColor: String, direction: vec3)

                /** an array of RGB values describing the diffuse color of the light. */
                diffuseColor: Number[]
                /** an array of RGB values describing the specular color of the light. */
                specularColor: Number[]
                /** a vector pointing in the direction that the light is shining. */
                direction: vec3
                /** a pointer to the associated camera view for the Canvas3D. */
                camera: Camera

                /** sets up the values for the light */
		        lightScene(specularColor: String, diffuseColor: String, direction: vec3): void

                /** sets up the projection and perspective matrixes from the light's perspective, mainly for shadow maps */
		        updateView(): void
            }

            /** contains material properties for a given 3D context */
            class Material {
                constructor(gl: WebGLRenderingContext)

                /** array storing the ambient color. */
                aCache: Number[]
                /** array storing the diffuse color. */
                dCache: Number[]
                /** array storing the specular color. */
                sCache: Number[]
                /** current shininess value. */
                snCache: Number
                /** current alpha value. */
                alCache: Number

                /** sets the diffuse color to the values contained in the provided array. */
		        setDiffuseColor(diffuseColor: Number[]): void

                /** sets the alpha transparency value. */
		        setDiffuseColor(alpha: Number): void

                /** sets temporary values for all colors and shininess. */
		        setTempColors(ambientColor: Number[], diffuseColor: Number[], specularColor: Number[], shininess: Number): void
            }

            /** this class manages an invisible 2D <canvas> for rendering character data to be used in WebGL components. */
            class TextImage {
                constructor()

                init(gl: WebGLRenderingContext): void
            }

            /** this class creates the WebGL text objects that are rendered to WebGL components. */
            class TextMesh {
                constructor()
            }

            /** this class defines the default text rendering of the scene. */
            class Label {
                constructor()
            }

            /** the parent class for the various vertex and fragment shader pairs for WebGL canvases. */
            abstract class _Shader {
                /** disables the vertex attributes array. */
		        disableAttribsArray(gl: WebGLRenderingContext): void

                /** enables the vertex attributes array. */
		        enableAttribsArray(gl: WebGLRenderingContext): void

                /** returns a pointer to the requested shader. */
		        getShader(gl: WebGLRenderingContext, id: Number): WebGLShader

                /** initializes a shader given the id and source of the shader. */
		        getShaderFromStr(gl: WebGLRenderingContext, shaderType: Number, strSrc: String): WebGLShader

                /** initializes the vertex and fragment shaders for a given WebGL canvas. */
		        init(gl: WebGLRenderingContext): void

                /** initializes the main uniform variables for the shaders. */
		        initUniformLocations(gl: WebGLRenderingContext): void

                /** called when the shader is attached to initialize locations for attribute variables. */
		        onShaderAttached(gl: WebGLRenderingContext): void

                /** set the model view matrix to the shader (with pre-processing). */
		        setMatrixUniforms(gl: WebGLRenderingContext, modelMatrix: mat4): void

                /** set the model view matrix to the shader. */
		        setModelViewMatrix(gl: WebGLRenderingContext, mvMatrix: mat4): void

                /** set the projection matrix to the shader. */
		        setProjectionMatrix(gl: WebGLRenderingContext, matrix: mat4): void

                /** enables this shader for the GL context. */
		        useShaderProgram(gl: WebGLRenderingContext): void

                /** load the default fragment shader. */
		        abstract loadDefaultFragmentShader(gl: WebGLRenderingContext): void

                /** load the default vertex shader.  */
		        abstract loadDefaultVertexShader(gl: WebGLRenderingContext): void
            }

            /** this class handles the rendering to depth map FBOs, mainly for shadows. (Proprietary Only) */
            class DepthShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading anti-aliasing pass, based on the FXAA algorithm. */
            class FXAAShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the rendering of text textures that are rendered to WebGL components. */
            class LabelShader extends _Shader {
                constructor()

                /** set the texture dimensions to the shader program. */
		        setDimension(gl: WebGLRenderingContext, width: Number, height: Number): void

                override disableAttribsArray(gl: WebGLRenderingContext): void;

                override enableAttribsArray(gl: WebGLRenderingContext): void;

                override init(gl: WebGLRenderingContext): void;

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;

                override onShaderAttached(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading lighting pass. */
            class LightingShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading normals pass. */
            class NormalShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading outlining pass. */
            class OutlineShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this is the default rendering shader for the ChemDoodle Web Components, using a Blinn-Phong model. */
            class PhongShader extends _Shader {
                constructor()

                override disableAttribsArray(gl: WebGLRenderingContext): void;

                override enableAttribsArray(gl: WebGLRenderingContext): void;

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the rendering of pickable objects, allowing the Picker to work. */
            class PickShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading position attribute pass. */
            class PositionShader extends _Shader {
                constructor()

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the rendering of quads to the canvas. */
            class QuadShader extends _Shader {
                constructor()

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading SSAO blur pass. (Proprietary Only) */
            class SSAOBlurShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class handles the deferred shading SSAO pass. (Proprietary Only) */
            class SSAOShader extends _Shader {
                constructor()

                override initUniformLocations(gl: WebGLRenderingContext): void;

                override loadDefaultFragmentShader(gl: WebGLRenderingContext): void;

                override loadDefaultVertexShader(gl: WebGLRenderingContext): void;
            }

            /** this class manages the FBO and picking system for WebGL components. */
            class Picker {
                constructor()

                /** initializes the picking system for a given WebGL canvas. */
		        init(gl: WebGLRenderingContext): void

                /** sets the width and height information */
		        setDimension(gl: WebGLRenderingContext, width: Number, height: Number): void
            }
        }
    }

    module uis {

        class CopyPasteManager { }

        module actions {
            class HistoryManager { }
        }

        module tools {
            class Lasso { }
        }

        module states {
            class StateManager { }

            class StateManager3D { }
        }
        module gui {
            module desktop {
                class Button { }

                class CursorManager { }

                class TextInput { }

                class Tray { }

                class Popover { }
                /** this class organizes and manages the toolbars for the sketcher. */
                class ToolbarManager {
                    /** sets up the HTML with jQuery UI */
                    setup(): void
                }
            }
        }
    }
}

export default ChemDoodle
